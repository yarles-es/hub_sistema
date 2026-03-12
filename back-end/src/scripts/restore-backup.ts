import 'dotenv/config';
import { spawn } from 'node:child_process';
import { constants } from 'node:fs';
import { access, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { ensureBackupsDir, restorePostgresFromFile } from '../utils/pgsql-backup';

function isSupportedBackupFile(filePath: string) {
  const lower = filePath.toLowerCase();
  return lower.endsWith('.sql') || lower.endsWith('.sql.gz');
}

async function resolveBackupPath(inputPath?: string) {
  if (inputPath) {
    const absPath = path.resolve(inputPath);
    await access(absPath, constants.R_OK);

    if (!isSupportedBackupFile(absPath)) {
      throw new Error('Arquivo não suportado. Use .sql ou .sql.gz.');
    }

    return absPath;
  }

  const backupsDir = await ensureBackupsDir();
  const entries = await readdir(backupsDir);

  const candidates = await Promise.all(
    entries
      .filter((entry) => isSupportedBackupFile(entry))
      .map(async (entry) => {
        const absPath = path.join(backupsDir, entry);
        const info = await stat(absPath);
        return { absPath, mtimeMs: info.mtimeMs };
      }),
  );

  const latest = candidates.sort((a, b) => b.mtimeMs - a.mtimeMs)[0];

  if (!latest) {
    throw new Error(`Nenhum backup .sql ou .sql.gz encontrado em ${backupsDir}`);
  }

  return latest.absPath;
}

async function runPrismaMigrateDeploy() {
  const npxBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';

  await new Promise<void>((resolve, reject) => {
    const child = spawn(npxBin, ['prisma', 'migrate', 'deploy'], {
      cwd: path.resolve(),
      env: process.env,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`prisma migrate deploy finalizou com código ${code ?? 1}`));
    });
  });
}

async function main() {
  const inputPath = process.argv[2];
  const backupPath = await resolveBackupPath(inputPath);

  console.log(`Restaurando backup: ${backupPath}`);
  await restorePostgresFromFile(backupPath, { dropAndRecreatePublic: true });

  console.log('Aplicando migrations pendentes...');
  await runPrismaMigrateDeploy();

  console.log('Restauração concluída.');
}

main().catch((error: any) => {
  console.error(error?.message ?? error);
  process.exit(1);
});

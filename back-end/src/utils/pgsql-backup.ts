import { promisify } from 'node:util';
import { exec as execCb } from 'node:child_process';
import { mkdir, access } from 'node:fs/promises';
import { constants, createReadStream } from 'node:fs';
import path from 'node:path';

const exec = promisify(execCb);

function parseDbUrl(raw: string) {
  const u = new URL(raw);
  const password = u.password;
  const dbName = u.pathname.replace(/^\//, '') || 'db';
  u.password = '';
  return { safeUrl: u.toString(), password, dbName, host: u.hostname };
}

export async function ensureBackupsDir(dir = path.resolve('backups')) {
  await mkdir(dir, { recursive: true });
  return dir;
}

export function buildFilename(prefix: string, host: string, db: string, ext: string) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  return `${prefix}_${host}_${db}_${ts}.${ext}`;
}

export async function backupPostgres(outputDir?: string) {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL não definida no .env');

  const { safeUrl, password, dbName, host } = parseDbUrl(dbUrl);
  const outDir = await ensureBackupsDir(outputDir);
  const file = buildFilename('backup', host, dbName, 'sql.gz');
  const outPath = path.join(outDir, file);

  const cmd = `pg_dump --no-owner --format=plain --dbname="${safeUrl}" | gzip > "${outPath}"`;
  await exec(cmd, { env: { ...process.env, PGPASSWORD: password } });

  return outPath;
}

export async function restorePostgresFromFile(filePath: string, { dropAndRecreatePublic = true } = {}) {
  await access(filePath, constants.R_OK);

  const rawUrl = process.env.DATABASE_RESTORE_URL || process.env.DATABASE_URL;
  if (!rawUrl) throw new Error('Defina DATABASE_URL (ou DATABASE_RESTORE_URL) no .env para restaurar');

  const { safeUrl, password } = parseDbUrl(rawUrl);

  if (dropAndRecreatePublic) {
    const pre = `psql "${safeUrl}" -v ON_ERROR_STOP=1 -c "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"`;
    await exec(pre, { env: { ...process.env, PGPASSWORD: password } });
  }

  const lower = filePath.toLowerCase();
  let cmd: string;
  if (lower.endsWith('.sql.gz')) {
    cmd = `gunzip -c "${filePath}" | psql "${safeUrl}" -v ON_ERROR_STOP=1`;
  } else if (lower.endsWith('.sql')) {
    cmd = `psql "${safeUrl}" -v ON_ERROR_STOP=1 -f "${filePath}"`;
  } else {
    throw new Error('Extensão não suportada. Use .sql ou .sql.gz (para .dump, veja notas ao final).');
  }

  await exec(cmd, { env: { ...process.env, PGPASSWORD: password } });
}

export function openBackupStream(absPath: string) {
  return createReadStream(absPath);
}

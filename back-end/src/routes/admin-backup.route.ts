import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { stat, unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import {
  backupPostgres,
  ensureBackupsDir,
  openBackupStream,
  restorePostgresFromFile,
} from '../utils/pgsql-backup';

const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const dir = await ensureBackupsDir();
        cb(null, dir);
      } catch (e) {
        cb(e as Error, '');
      }
    },
    filename: (req, file, cb) => {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      const parsed = path.parse(file.originalname);
      cb(null, `${parsed.name}_${ts}${parsed.ext}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.sql', '.gz'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext) && !file.originalname.toLowerCase().endsWith('.sql.gz')) {
      return cb(new Error('Arquivo não suportado. Envie .sql ou .sql.gz'));
    }
    cb(null, true);
  },
});

router.post('/download', async (req, res) => {
  let abs: string | null = null;

  try {
    abs = await backupPostgres();
    const filename = path.basename(abs);

    const st = await stat(abs);
    if (!st.size) {
      throw new Error('pg_dump gerou arquivo vazio (verifique credenciais/acesso ao DB).');
    }

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Length', String(st.size));

    req.on('aborted', () => {
      if (abs) unlink(abs).catch(() => {});
    });

    await pipeline(openBackupStream(abs), res);
  } catch (e: any) {
    console.error('[POST /admin/backup] ERRO:', e?.message);
    if (!res.headersSent) {
      return res.status(500).json({ ok: false, error: e?.message ?? 'Erro ao gerar/baixar backup' });
    }
    try {
      res.end();
    } catch {}
  } finally {
    if (abs) {
      await unlink(abs).catch(() => {});
    }
  }
});

router.post('/restore', upload.single('file'), async (req, res) => {
  try {
    if (!req.file?.path) return res.status(400).json({ ok: false, error: 'Arquivo é obrigatório' });
    await restorePostgresFromFile(req.file.path, { dropAndRecreatePublic: true });
    return res.json({ ok: true, restoredFrom: req.file.filename });
  } catch (e: any) {
    console.error('[POST /admin/backup/restore] ERRO:', e?.message);
    return res.status(500).json({ ok: false, error: e?.message ?? 'Erro na restauração' });
  }
});

export const backupRoute = router;

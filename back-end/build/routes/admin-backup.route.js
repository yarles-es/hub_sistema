"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupRoute = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = require("node:fs/promises");
const promises_2 = require("node:stream/promises");
const pgsql_backup_1 = require("../utils/pgsql-backup");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const dir = yield (0, pgsql_backup_1.ensureBackupsDir)();
                cb(null, dir);
            }
            catch (e) {
                cb(e, '');
            }
        }),
        filename: (req, file, cb) => {
            const ts = new Date().toISOString().replace(/[:.]/g, '-');
            const parsed = node_path_1.default.parse(file.originalname);
            cb(null, `${parsed.name}_${ts}${parsed.ext}`);
        },
    }),
    limits: { fileSize: 1024 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['.sql', '.gz'];
        const ext = node_path_1.default.extname(file.originalname).toLowerCase();
        if (!allowed.includes(ext) && !file.originalname.toLowerCase().endsWith('.sql.gz')) {
            return cb(new Error('Arquivo não suportado. Envie .sql ou .sql.gz'));
        }
        cb(null, true);
    },
});
router.post('/download', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let abs = null;
    try {
        abs = yield (0, pgsql_backup_1.backupPostgres)();
        const filename = node_path_1.default.basename(abs);
        const st = yield (0, promises_1.stat)(abs);
        if (!st.size) {
            throw new Error('pg_dump gerou arquivo vazio (verifique credenciais/acesso ao DB).');
        }
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/gzip');
        res.setHeader('Content-Length', String(st.size));
        req.on('aborted', () => {
            if (abs)
                (0, promises_1.unlink)(abs).catch(() => { });
        });
        yield (0, promises_2.pipeline)((0, pgsql_backup_1.openBackupStream)(abs), res);
    }
    catch (e) {
        console.error('[POST /admin/backup] ERRO:', e === null || e === void 0 ? void 0 : e.message);
        if (!res.headersSent) {
            return res.status(500).json({ ok: false, error: (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : 'Erro ao gerar/baixar backup' });
        }
        try {
            res.end();
        }
        catch (_b) { }
    }
    finally {
        if (abs) {
            yield (0, promises_1.unlink)(abs).catch(() => { });
        }
    }
}));
router.post('/restore', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req.file) === null || _a === void 0 ? void 0 : _a.path))
            return res.status(400).json({ ok: false, error: 'Arquivo é obrigatório' });
        yield (0, pgsql_backup_1.restorePostgresFromFile)(req.file.path, { dropAndRecreatePublic: true });
        return res.json({ ok: true, restoredFrom: req.file.filename });
    }
    catch (e) {
        console.error('[POST /admin/backup/restore] ERRO:', e === null || e === void 0 ? void 0 : e.message);
        return res.status(500).json({ ok: false, error: (_b = e === null || e === void 0 ? void 0 : e.message) !== null && _b !== void 0 ? _b : 'Erro na restauração' });
    }
}));
exports.backupRoute = router;

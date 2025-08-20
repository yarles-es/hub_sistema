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
exports.ensureBackupsDir = ensureBackupsDir;
exports.buildFilename = buildFilename;
exports.backupPostgres = backupPostgres;
exports.restorePostgresFromFile = restorePostgresFromFile;
exports.openBackupStream = openBackupStream;
const node_util_1 = require("node:util");
const node_child_process_1 = require("node:child_process");
const promises_1 = require("node:fs/promises");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const exec = (0, node_util_1.promisify)(node_child_process_1.exec);
function parseDbUrl(raw) {
    const u = new URL(raw);
    const password = u.password;
    const dbName = u.pathname.replace(/^\//, '') || 'db';
    u.password = '';
    return { safeUrl: u.toString(), password, dbName, host: u.hostname };
}
function ensureBackupsDir() {
    return __awaiter(this, arguments, void 0, function* (dir = node_path_1.default.resolve('backups')) {
        yield (0, promises_1.mkdir)(dir, { recursive: true });
        return dir;
    });
}
function buildFilename(prefix, host, db, ext) {
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    return `${prefix}_${host}_${db}_${ts}.${ext}`;
}
function backupPostgres(outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl)
            throw new Error('DATABASE_URL não definida no .env');
        const { safeUrl, password, dbName, host } = parseDbUrl(dbUrl);
        const outDir = yield ensureBackupsDir(outputDir);
        const file = buildFilename('backup', host, dbName, 'sql.gz');
        const outPath = node_path_1.default.join(outDir, file);
        const cmd = `pg_dump --no-owner --format=plain --dbname="${safeUrl}" | gzip > "${outPath}"`;
        yield exec(cmd, { env: Object.assign(Object.assign({}, process.env), { PGPASSWORD: password }) });
        return outPath;
    });
}
function restorePostgresFromFile(filePath_1) {
    return __awaiter(this, arguments, void 0, function* (filePath, { dropAndRecreatePublic = true } = {}) {
        yield (0, promises_1.access)(filePath, node_fs_1.constants.R_OK);
        const rawUrl = process.env.DATABASE_RESTORE_URL || process.env.DATABASE_URL;
        if (!rawUrl)
            throw new Error('Defina DATABASE_URL (ou DATABASE_RESTORE_URL) no .env para restaurar');
        const { safeUrl, password } = parseDbUrl(rawUrl);
        if (dropAndRecreatePublic) {
            const pre = `psql "${safeUrl}" -v ON_ERROR_STOP=1 -c "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"`;
            yield exec(pre, { env: Object.assign(Object.assign({}, process.env), { PGPASSWORD: password }) });
        }
        const lower = filePath.toLowerCase();
        let cmd;
        if (lower.endsWith('.sql.gz')) {
            cmd = `gunzip -c "${filePath}" | psql "${safeUrl}" -v ON_ERROR_STOP=1`;
        }
        else if (lower.endsWith('.sql')) {
            cmd = `psql "${safeUrl}" -v ON_ERROR_STOP=1 -f "${filePath}"`;
        }
        else {
            throw new Error('Extensão não suportada. Use .sql ou .sql.gz (para .dump, veja notas ao final).');
        }
        yield exec(cmd, { env: Object.assign(Object.assign({}, process.env), { PGPASSWORD: password }) });
    });
}
function openBackupStream(absPath) {
    return (0, node_fs_1.createReadStream)(absPath);
}

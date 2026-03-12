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
require("dotenv/config");
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const pgsql_backup_1 = require("../utils/pgsql-backup");
function isSupportedBackupFile(filePath) {
    const lower = filePath.toLowerCase();
    return lower.endsWith('.sql') || lower.endsWith('.sql.gz');
}
function resolveBackupPath(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (inputPath) {
            const absPath = node_path_1.default.resolve(inputPath);
            yield (0, promises_1.access)(absPath, node_fs_1.constants.R_OK);
            if (!isSupportedBackupFile(absPath)) {
                throw new Error('Arquivo não suportado. Use .sql ou .sql.gz.');
            }
            return absPath;
        }
        const backupsDir = yield (0, pgsql_backup_1.ensureBackupsDir)();
        const entries = yield (0, promises_1.readdir)(backupsDir);
        const candidates = yield Promise.all(entries
            .filter((entry) => isSupportedBackupFile(entry))
            .map((entry) => __awaiter(this, void 0, void 0, function* () {
            const absPath = node_path_1.default.join(backupsDir, entry);
            const info = yield (0, promises_1.stat)(absPath);
            return { absPath, mtimeMs: info.mtimeMs };
        })));
        const latest = candidates.sort((a, b) => b.mtimeMs - a.mtimeMs)[0];
        if (!latest) {
            throw new Error(`Nenhum backup .sql ou .sql.gz encontrado em ${backupsDir}`);
        }
        return latest.absPath;
    });
}
function runPrismaMigrateDeploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const npxBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
        yield new Promise((resolve, reject) => {
            const child = (0, node_child_process_1.spawn)(npxBin, ['prisma', 'migrate', 'deploy'], {
                cwd: node_path_1.default.resolve(),
                env: process.env,
                stdio: 'inherit',
            });
            child.on('error', reject);
            child.on('close', (code) => {
                if (code === 0) {
                    resolve();
                    return;
                }
                reject(new Error(`prisma migrate deploy finalizou com código ${code !== null && code !== void 0 ? code : 1}`));
            });
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = process.argv[2];
        const backupPath = yield resolveBackupPath(inputPath);
        console.log(`Restaurando backup: ${backupPath}`);
        yield (0, pgsql_backup_1.restorePostgresFromFile)(backupPath, { dropAndRecreatePublic: true });
        console.log('Aplicando migrations pendentes...');
        yield runPrismaMigrateDeploy();
        console.log('Restauração concluída.');
    });
}
main().catch((error) => {
    var _a;
    console.error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
    process.exit(1);
});

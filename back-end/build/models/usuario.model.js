"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const bcrypt_1 = require("../utils/bcrypt");
let UsuarioModel = class UsuarioModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(usuario, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const user = yield client.usuario.create({
                data: Object.assign(Object.assign({}, usuario), { senha: yield (0, bcrypt_1.generateHashBcrypt)(usuario.senha) }),
            });
            const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
            return userWithoutPassword;
        });
    }
    findAll(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const users = yield client.usuario.findMany({
                orderBy: { id: 'desc' },
            });
            return users.map((user) => {
                const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
                return userWithoutPassword;
            });
        });
    }
    findByEmail(email, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const user = yield client.usuario.findUnique({
                where: { email },
            });
            if (!user)
                return null;
            const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
            return userWithoutPassword;
        });
    }
    findByEmailWithPassword(email, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return yield client.usuario.findUnique({
                where: { email },
            });
        });
    }
    findById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const user = yield client.usuario.findUnique({
                where: { id },
            });
            if (!user)
                return null;
            const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
            return userWithoutPassword;
        });
    }
    update(id, usuario, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (usuario.senha)
                usuario.senha = yield (0, bcrypt_1.generateHashBcrypt)(usuario.senha);
            const client = transaction || this.prisma;
            const user = yield client.usuario.update({
                where: { id },
                data: usuario,
            });
            const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
            return userWithoutPassword;
        });
    }
    editStatus(id, status, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const user = yield client.usuario.update({
                where: { id },
                data: { ativo: status },
            });
            const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
            return userWithoutPassword;
        });
    }
};
exports.UsuarioModel = UsuarioModel;
exports.UsuarioModel = UsuarioModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], UsuarioModel);

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
exports.RegistroAcessoModel = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const toIntOrNull_1 = require("../utils/toIntOrNull");
let RegistroAcessoModel = class RegistroAcessoModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(registro, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.registroAcesso.create({
                data: Object.assign({}, registro),
            });
        });
    }
    findAll(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.registroAcesso.findMany({
                orderBy: { id: 'desc' },
            });
        });
    }
    findAllByFilter(filter, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const where = {};
            const dataHora = {};
            if (filter.clienteId !== undefined) {
                where.clienteId = filter.clienteId;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.initialDate)
                dataHora.gte = filter.initialDate;
            if (filter === null || filter === void 0 ? void 0 : filter.finalDate)
                dataHora.lte = filter.finalDate;
            if (Object.keys(dataHora).length > 0) {
                where.dataHora = dataHora;
            }
            where.dataHora = dataHora;
            const registros = yield client.registroAcesso.findMany({
                where,
                select: {
                    id: true,
                    tipoCatraca: true,
                    clienteId: true,
                    dataHora: true,
                    cliente: {
                        select: {
                            nome: true,
                        },
                    },
                },
                orderBy: { dataHora: 'asc' },
            });
            return registros;
        });
    }
    findAllForDay(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const parsedId = (0, toIntOrNull_1.toIntOrNull)(id);
            const where = Object.assign({ dataHora: {
                    gte: startOfDay,
                    lte: endOfDay,
                } }, (parsedId !== null ? { id: { gte: parsedId } } : {}));
            const result = yield client.registroAcesso.findMany({
                where,
                orderBy: { id: 'desc' },
                include: {
                    cliente: {
                        select: {
                            nome: true,
                        },
                    },
                },
            });
            return result.map((registro) => {
                var _a;
                const { cliente } = registro, rest = __rest(registro, ["cliente"]);
                return Object.assign(Object.assign({}, rest), { nomeCliente: (_a = cliente === null || cliente === void 0 ? void 0 : cliente.nome) !== null && _a !== void 0 ? _a : 'NÃO IDENTIFICADO' });
            });
        });
    }
    findAllByClienteId(clienteId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialHoursDay = new Date();
            initialHoursDay.setHours(0, 0, 0, 0);
            const finalHoursDay = new Date();
            finalHoursDay.setHours(23, 59, 59, 999);
            const where = {
                clienteId,
                dataHora: {
                    gte: initialHoursDay,
                    lte: finalHoursDay,
                },
            };
            const client = transaction || this.prisma;
            return client.registroAcesso.findMany({
                where,
                orderBy: { dataHora: 'desc' },
            });
        });
    }
};
exports.RegistroAcessoModel = RegistroAcessoModel;
exports.RegistroAcessoModel = RegistroAcessoModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], RegistroAcessoModel);

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSistemaModel = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
let LogSistemaModel = class LogSistemaModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    createLog(usuarioId, acao, clienteId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return yield client.logSistema.create({
                data: {
                    usuarioId,
                    acao,
                    clienteId,
                },
            });
        });
    }
    getLogs(page, limit, filter, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const where = {};
            const dataHora = {};
            if (filter === null || filter === void 0 ? void 0 : filter.initialDate)
                dataHora.gte = filter.initialDate;
            if (filter === null || filter === void 0 ? void 0 : filter.finalDate)
                dataHora.lte = filter.finalDate;
            if (Object.keys(dataHora).length > 0) {
                where.dataHora = dataHora;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.usuarioId) {
                where.usuarioId = filter.usuarioId;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.clienteId) {
                where.clienteId = filter.clienteId;
            }
            const [data, total] = yield Promise.all([
                client.logSistema.findMany({
                    where,
                    include: {
                        usuario: {
                            select: {
                                nome: true,
                            },
                        },
                        cliente: {
                            select: {
                                nome: true,
                            },
                        },
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: {
                        dataHora: 'desc',
                    },
                }),
                client.logSistema.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                limit,
            };
        });
    }
};
exports.LogSistemaModel = LogSistemaModel;
exports.LogSistemaModel = LogSistemaModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], LogSistemaModel);

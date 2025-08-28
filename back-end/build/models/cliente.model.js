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
exports.ClienteModel = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
let ClienteModel = class ClienteModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(cliente, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.create({
                data: Object.assign({}, cliente),
            });
        });
    }
    findById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.findUnique({
                where: { id },
            });
        });
    }
    findByEmail(email, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.findUnique({
                where: { email },
            });
        });
    }
    update(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.update({
                where: { id },
                data: Object.assign({}, data),
            });
        });
    }
    delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.delete({
                where: { id },
            });
        });
    }
    findAllByName(name, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.findMany({
                where: { nome: { contains: name, mode: 'insensitive' } },
                orderBy: { id: 'desc' },
                include: {
                    Mensalidade: true,
                    plano: {
                        select: {
                            id: true,
                            nome: true,
                            valor: true,
                        },
                    },
                },
            });
        });
    }
    findByBirthdayPeopleMonth(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = transaction !== null && transaction !== void 0 ? transaction : this.prisma;
            const month = new Date().getMonth() + 1;
            const ids = yield prisma.$queryRaw `
    SELECT "id"
    FROM "clientes"
    WHERE "data_nascimento" IS NOT NULL
      AND EXTRACT(MONTH FROM "data_nascimento") = ${month}
  `;
            if (ids.length === 0)
                return [];
            const result = yield prisma.cliente.findMany({
                where: { id: { in: ids.map((r) => r.id) } },
                include: {
                    Mensalidade: true,
                    plano: { select: { id: true, nome: true, valor: true } },
                },
                orderBy: { dataNascimento: 'asc' },
            });
            result.sort((a, b) => {
                const da = a.dataNascimento ? new Date(a.dataNascimento).getDate() : 0;
                const db = b.dataNascimento ? new Date(b.dataNascimento).getDate() : 0;
                return da - db;
            });
            return result;
        });
    }
    findByDataNascimento(date, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const where = {};
            const start = new Date(date);
            start.setUTCHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setUTCHours(23, 59, 59, 999);
            where.dataNascimento = {
                gte: start,
                lte: end,
            };
            const result = yield client.cliente.findMany({
                where: { dataNascimento: where.dataNascimento },
                include: {
                    Mensalidade: {
                        where: { status: client_1.StatusMensalidade.PENDENTE },
                    },
                    plano: {
                        select: {
                            id: true,
                            nome: true,
                            valor: true,
                        },
                    },
                },
            });
            if (result.length === 0) {
                return null;
            }
            return result[0];
        });
    }
    findAllFiltered(page, limit, filter, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const where = {};
            if (filter === null || filter === void 0 ? void 0 : filter.nome)
                where.nome = { contains: filter.nome, mode: 'insensitive' };
            if (filter === null || filter === void 0 ? void 0 : filter.email)
                where.email = { contains: filter.email, mode: 'insensitive' };
            if (filter === null || filter === void 0 ? void 0 : filter.telefone)
                where.telefone = { contains: filter.telefone, mode: 'insensitive' };
            if (filter === null || filter === void 0 ? void 0 : filter.planoId)
                where.planoId = filter.planoId;
            if (filter === null || filter === void 0 ? void 0 : filter.dataNascimento) {
                const d = new Date(filter.dataNascimento);
                const start = new Date(d);
                start.setUTCHours(0, 0, 0, 0);
                const end = new Date(d);
                end.setUTCHours(23, 59, 59, 999);
                where.dataNascimento = { gte: start, lte: end };
            }
            const now = new Date();
            const inicioHojeLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            switch (filter === null || filter === void 0 ? void 0 : filter.status) {
                case 'ATIVO':
                    where.AND = [
                        { ativo: true },
                        {
                            Mensalidade: {
                                some: { status: client_1.StatusMensalidade.PENDENTE, vencimento: { gte: inicioHojeLocal } },
                            },
                        },
                        {
                            Mensalidade: {
                                none: { status: client_1.StatusMensalidade.PENDENTE, vencimento: { lt: inicioHojeLocal } },
                            },
                        },
                    ];
                    break;
                case 'DESATIVADO':
                    where.ativo = false;
                    break;
                case 'VENCIDO':
                    where.Mensalidade = {
                        some: { status: client_1.StatusMensalidade.PENDENTE, vencimento: { lt: inicioHojeLocal } },
                    };
                    break;
                case 'MENSALIDADE_AUSENTE':
                    where.isento = false;
                    where.ativo = true;
                    where.Mensalidade = { none: { status: client_1.StatusMensalidade.PENDENTE } };
                    break;
                case 'ISENTO':
                    where.isento = true;
                    break;
            }
            let includeMensalidadeWhere = {
                status: client_1.StatusMensalidade.PENDENTE,
            };
            if ((filter === null || filter === void 0 ? void 0 : filter.status) === 'ATIVO') {
                includeMensalidadeWhere = {
                    status: client_1.StatusMensalidade.PENDENTE,
                    vencimento: { gte: inicioHojeLocal },
                };
            }
            if ((filter === null || filter === void 0 ? void 0 : filter.status) === 'VENCIDO') {
                includeMensalidadeWhere = {
                    status: client_1.StatusMensalidade.PENDENTE,
                    vencimento: { lt: inicioHojeLocal },
                };
            }
            const [data, total] = yield Promise.all([
                client.cliente.findMany({
                    where,
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { id: 'desc' },
                    include: {
                        Mensalidade: {
                            where: includeMensalidadeWhere,
                            orderBy: { vencimento: 'asc' },
                        },
                        plano: { select: { id: true, nome: true, valor: true } },
                    },
                }),
                client.cliente.count({ where }),
            ]);
            return { data, total, page, limit };
        });
    }
    countTypeClientes(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const client = transaction || this.prisma;
            const resumo = yield client.cliente.groupBy({
                by: ['ativo', 'isento'],
                _count: { _all: true },
            });
            const desativados = (_b = (_a = resumo.find((r) => r.ativo === false)) === null || _a === void 0 ? void 0 : _a._count._all) !== null && _b !== void 0 ? _b : 0;
            const isentos = (_d = (_c = resumo.find((r) => r.ativo === true && r.isento === true)) === null || _c === void 0 ? void 0 : _c._count._all) !== null && _d !== void 0 ? _d : 0;
            const now = new Date();
            const inicioHojeLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const vencidos = yield client.cliente.count({
                where: {
                    ativo: true,
                    isento: false,
                    Mensalidade: { some: { status: client_1.StatusMensalidade.PENDENTE, vencimento: { lt: inicioHojeLocal } } },
                },
            });
            const ativos = yield client.cliente.count({
                where: {
                    ativo: true,
                    isento: false,
                    Mensalidade: {
                        some: { status: client_1.StatusMensalidade.PENDENTE, vencimento: { gte: inicioHojeLocal } },
                        none: { status: client_1.StatusMensalidade.PENDENTE, vencimento: { lt: inicioHojeLocal } },
                    },
                },
            });
            const mensalidadeInexistente = yield client.cliente.count({
                where: {
                    isento: false,
                    ativo: true,
                    Mensalidade: { none: { status: client_1.StatusMensalidade.PENDENTE } },
                },
            });
            return { ativos, vencidos, desativados, isentos, mensalidadeInexistente };
        });
    }
    getAllWithMensalidadeByPlanId(planoId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.findMany({
                where: {
                    planoId,
                },
                include: {
                    Mensalidade: {
                        where: {
                            status: client_1.StatusMensalidade.PENDENTE,
                        },
                    },
                    plano: {
                        select: {
                            id: true,
                            nome: true,
                            valor: true,
                        },
                    },
                },
                orderBy: { id: 'desc' },
            });
        });
    }
    findByIdRegistro(idRegistro, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.cliente.findUnique({
                where: { catracaId: idRegistro },
                include: {
                    Mensalidade: {
                        where: { status: client_1.StatusMensalidade.PENDENTE },
                    },
                    plano: {
                        select: {
                            id: true,
                            nome: true,
                            valor: true,
                        },
                    },
                },
            });
        });
    }
};
exports.ClienteModel = ClienteModel;
exports.ClienteModel = ClienteModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ClienteModel);

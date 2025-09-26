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
exports.MensalidadeModel = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
let MensalidadeModel = class MensalidadeModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(mensalidade, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.mensalidade.create({
                data: Object.assign({}, mensalidade),
            });
        });
    }
    findById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.mensalidade.findUnique({
                where: { id },
                include: {
                    cliente: {
                        select: {
                            nome: true,
                            email: true,
                        },
                    },
                },
            });
        });
    }
    findByClienteId(clienteId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.mensalidade.findMany({
                where: { clienteId },
            });
        });
    }
    findByClienteIdAndStatus(clienteId, status, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.mensalidade.findMany({
                where: { clienteId, status },
            });
        });
    }
    update(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.mensalidade.update({
                where: { id },
                data: Object.assign({}, data),
            });
        });
    }
    delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.mensalidade.delete({
                where: { id },
            });
        });
    }
    findAll(page, limit, filter, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const client = transaction || this.prisma;
            const where = {};
            const vencimento = {};
            const dataPagamento = {};
            if (filter === null || filter === void 0 ? void 0 : filter.initialPaymentDate)
                dataPagamento.gte = filter.initialPaymentDate;
            if (filter === null || filter === void 0 ? void 0 : filter.finalPaymentDate)
                dataPagamento.lte = filter.finalPaymentDate;
            if (Object.keys(dataPagamento).length > 0) {
                where.dataPagamento = dataPagamento;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.initialDate)
                vencimento.gte = filter.initialDate;
            if (filter === null || filter === void 0 ? void 0 : filter.finalDate)
                vencimento.lte = filter.finalDate;
            if (Object.keys(vencimento).length > 0) {
                where.vencimento = vencimento;
            }
            if ((filter === null || filter === void 0 ? void 0 : filter.status) && filter.status.length > 0) {
                where.status = { in: filter.status };
            }
            else {
                where.status = { not: client_1.StatusMensalidade.CANCELADO };
            }
            if (filter === null || filter === void 0 ? void 0 : filter.clienteId) {
                where.clienteId = filter.clienteId;
            }
            if ((filter === null || filter === void 0 ? void 0 : filter.formaPagamento) && filter.formaPagamento.length > 0) {
                where.formaPagamento = { in: filter.formaPagamento };
            }
            const [data, total, totalPago, totalPix, totalCartao, totalDinheiro] = yield Promise.all([
                client.mensalidade.findMany({
                    where,
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: {
                        vencimento: 'desc',
                    },
                    include: {
                        cliente: {
                            select: {
                                nome: true,
                                email: true,
                            },
                        },
                    },
                }),
                client.mensalidade.count({ where }),
                client.mensalidade.aggregate({
                    where,
                    _sum: {
                        valorPago: true,
                    },
                }),
                client.mensalidade.aggregate({
                    where: Object.assign(Object.assign({}, where), { formaPagamento: client_1.FormPagamento.PIX }),
                    _sum: {
                        valorPago: true,
                    },
                }),
                client.mensalidade.aggregate({
                    where: Object.assign(Object.assign({}, where), { formaPagamento: client_1.FormPagamento.CARTAO }),
                    _sum: {
                        valorPago: true,
                    },
                }),
                client.mensalidade.aggregate({
                    where: Object.assign(Object.assign({}, where), { formaPagamento: client_1.FormPagamento.DINHEIRO }),
                    _sum: {
                        valorPago: true,
                    },
                }),
            ]);
            return {
                totalPago: (_a = totalPago._sum.valorPago) !== null && _a !== void 0 ? _a : 0,
                totalPix: (_b = totalPix._sum.valorPago) !== null && _b !== void 0 ? _b : 0,
                totalCartao: (_c = totalCartao._sum.valorPago) !== null && _c !== void 0 ? _c : 0,
                totalDinheiro: (_d = totalDinheiro._sum.valorPago) !== null && _d !== void 0 ? _d : 0,
                data,
                total,
                page,
                limit,
            };
        });
    }
    findAllPendingByClienteId(clienteId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const data = yield client.mensalidade.findMany({
                where: { clienteId, status: client_1.StatusMensalidade.PENDENTE },
                orderBy: {
                    vencimento: 'desc',
                },
                include: {
                    cliente: {
                        select: {
                            nome: true,
                            email: true,
                        },
                    },
                },
            });
            return data;
        });
    }
};
exports.MensalidadeModel = MensalidadeModel;
exports.MensalidadeModel = MensalidadeModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], MensalidadeModel);

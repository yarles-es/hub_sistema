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
exports.VendaProdutoModel = void 0;
const typedi_1 = require("typedi");
const client_1 = require("@prisma/client");
let VendaProdutoModel = class VendaProdutoModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (transaction || this.prisma).vendaProduto.create({ data });
        });
    }
    getById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (transaction || this.prisma).vendaProduto.findUnique({
                where: { id },
                include: {
                    produto: {
                        select: { nome: true },
                    },
                },
            });
        });
    }
    getAll(page, limit, filters, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            const where = {};
            const dataHora = {};
            if (filters === null || filters === void 0 ? void 0 : filters.initialDate)
                dataHora.gte = filters.initialDate;
            if (filters === null || filters === void 0 ? void 0 : filters.finalDate)
                dataHora.lte = filters.finalDate;
            if (filters === null || filters === void 0 ? void 0 : filters.productId) {
                where.produtoId = filters.productId;
            }
            if (Object.keys(dataHora).length > 0) {
                where.dataVenda = dataHora;
            }
            const [data, total, totalVendas, totalCusto, totalLucro] = yield Promise.all([
                client.vendaProduto.findMany({
                    where,
                    include: {
                        produto: {
                            select: { nome: true },
                        },
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: {
                        dataVenda: 'desc',
                    },
                }),
                client.vendaProduto.count({ where }),
                client.vendaProduto
                    .aggregate({
                    _sum: {
                        valorVenda: true,
                    },
                    where,
                })
                    .then((res) => { var _a; return (_a = res._sum.valorVenda) !== null && _a !== void 0 ? _a : 0; }),
                client.vendaProduto
                    .aggregate({
                    _sum: {
                        valorCusto: true,
                    },
                    where,
                })
                    .then((res) => { var _a; return (_a = res._sum.valorCusto) !== null && _a !== void 0 ? _a : 0; }),
                client.vendaProduto
                    .aggregate({
                    _sum: {
                        valorVenda: true,
                        valorCusto: true,
                    },
                    where,
                })
                    .then((res) => { var _a, _b; return ((_a = res._sum.valorVenda) !== null && _a !== void 0 ? _a : 0) - ((_b = res._sum.valorCusto) !== null && _b !== void 0 ? _b : 0); }),
            ]);
            return {
                data,
                total,
                totalVendas,
                totalCusto,
                totalLucro,
                page,
                limit,
            };
        });
    }
    update(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (transaction || this.prisma).vendaProduto.update({ where: { id: data.id }, data });
        });
    }
    deleteById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (transaction || this.prisma).vendaProduto.delete({ where: { id } });
            return result;
        });
    }
    getByProductId(productId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (transaction || this.prisma).vendaProduto.findMany({
                where: { produtoId: productId },
                include: {
                    produto: {
                        select: { nome: true },
                    },
                },
            });
        });
    }
    deleteByProductId(productId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (transaction || this.prisma).vendaProduto.deleteMany({
                where: { produtoId: productId },
            });
            return result.count;
        });
    }
};
exports.VendaProdutoModel = VendaProdutoModel;
exports.VendaProdutoModel = VendaProdutoModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], VendaProdutoModel);

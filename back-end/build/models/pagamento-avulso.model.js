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
exports.PagamentoAvulsoModel = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
let PagamentoAvulsoModel = class PagamentoAvulsoModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.pagamentoAvulso.create({
                data,
            });
        });
    }
    findById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.pagamentoAvulso.findUnique({
                where: { id },
            });
        });
    }
    update(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.pagamentoAvulso.update({
                where: { id },
                data,
            });
        });
    }
    delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = transaction || this.prisma;
            return client.pagamentoAvulso.delete({
                where: { id },
            });
        });
    }
    getAll(pageNumber, limitNumber, filters, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const client = transaction || this.prisma;
            const where = {};
            if (filters) {
                const dataHora = {};
                if (filters.initialDate)
                    dataHora.gte = filters.initialDate;
                if (filters.finalDate)
                    dataHora.lte = filters.finalDate;
                if (Object.keys(dataHora).length > 0) {
                    where.dataHora = dataHora;
                }
                if ((_a = filters.nomeCliente) === null || _a === void 0 ? void 0 : _a.trim()) {
                    where.nomeCliente = { contains: filters.nomeCliente.trim(), mode: 'insensitive' };
                }
                if ((_b = filters.observacao) === null || _b === void 0 ? void 0 : _b.trim()) {
                    where.observacao = { contains: filters.observacao.trim(), mode: 'insensitive' };
                }
                if ((_c = filters.formaPagamento) === null || _c === void 0 ? void 0 : _c.length) {
                    where.formaPagamento = { in: filters.formaPagamento };
                }
            }
            const [data, total] = yield Promise.all([
                client.pagamentoAvulso.findMany({
                    where,
                    skip: Math.max(0, (pageNumber - 1) * limitNumber),
                    take: limitNumber,
                    orderBy: { dataHora: 'desc' },
                }),
                client.pagamentoAvulso.count({ where }),
            ]);
            return { data, total, page: pageNumber, limit: limitNumber };
        });
    }
};
exports.PagamentoAvulsoModel = PagamentoAvulsoModel;
exports.PagamentoAvulsoModel = PagamentoAvulsoModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], PagamentoAvulsoModel);

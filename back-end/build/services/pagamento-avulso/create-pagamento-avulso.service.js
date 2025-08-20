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
exports.CreatePagamentoAvulsoService = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const _pagamento_avulso_service_1 = require("./@pagamento-avulso.service");
let CreatePagamentoAvulsoService = class CreatePagamentoAvulsoService {
    constructor(pagamentoAvulsoService) {
        this.pagamentoAvulsoService = pagamentoAvulsoService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate(data);
            return this.pagamentoAvulsoService.createPagamentoAvulso(data);
        });
    }
    validate(data) {
        const { formaPagamento, nomeCliente, observacao, valor } = data;
        if (!formaPagamento || client_1.FormPagamento[formaPagamento] === undefined) {
            throw new BadRequestError_1.BadRequestError('Forma de pagamento inválida');
        }
        if (nomeCliente && nomeCliente.trim() === '') {
            throw new BadRequestError_1.BadRequestError('Nome do cliente está inválido');
        }
        if (observacao && observacao.trim() === '') {
            throw new BadRequestError_1.BadRequestError('Observação está inválida');
        }
        if (valor === undefined || valor <= 0 || isNaN(valor)) {
            throw new BadRequestError_1.BadRequestError('Valor deve ser um número válido maior que zero');
        }
    }
};
exports.CreatePagamentoAvulsoService = CreatePagamentoAvulsoService;
exports.CreatePagamentoAvulsoService = CreatePagamentoAvulsoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_pagamento_avulso_service_1.PagamentoAvulsoService])
], CreatePagamentoAvulsoService);

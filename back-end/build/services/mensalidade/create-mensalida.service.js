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
exports.CreateMensalidadeService = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const _cliente_service_1 = require("../cliente/@cliente.service");
const _plano_service_1 = require("../plano/@plano.service");
const _mensalidade_service_1 = require("./@mensalidade.service");
let CreateMensalidadeService = class CreateMensalidadeService {
    constructor(mensalidadeService, clienteService, planoService) {
        this.mensalidadeService = mensalidadeService;
        this.clienteService = clienteService;
        this.planoService = planoService;
    }
    execute(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const { clienteId, dataVencimentoAnterior } = data;
            const cliente = yield this.clienteService.getClienteById(clienteId, transaction);
            if (!cliente) {
                throw new BadRequestError_1.BadRequestError('Cliente não encontrado.');
            }
            if (cliente.isento)
                return;
            const mensalidades = yield this.mensalidadeService.findMensalidadesByClienteIdAndStatus(clienteId, client_1.StatusMensalidade.PENDENTE, transaction);
            const mensalidadePendente = mensalidades.length > 0;
            if (mensalidadePendente) {
                throw new BadRequestError_1.BadRequestError('Já existe uma mensalidade pendente para este cliente.');
            }
            const plano = yield this.planoService.getPlanoById(cliente.planoId, transaction);
            if (!plano) {
                throw new BadRequestError_1.BadRequestError('Plano não encontrado para o cliente.');
            }
            if (!plano.ativo) {
                throw new BadRequestError_1.BadRequestError('Plano atual do cliente está inativo, não é possível criar mensalidade.');
            }
            if (!dataVencimentoAnterior) {
                yield this.clienteService.updateCliente(clienteId, {
                    diaMensalidade: (_a = cliente.diaMensalidade) !== null && _a !== void 0 ? _a : new Date().getDate(),
                }, transaction);
            }
            let vencimento;
            if (dataVencimentoAnterior) {
                vencimento = new Date(dataVencimentoAnterior);
                vencimento.setMonth(vencimento.getMonth() + 1);
                vencimento.setDate((_b = cliente.diaMensalidade) !== null && _b !== void 0 ? _b : vencimento.getDate());
                vencimento.setHours(3, 0, 0, 0);
            }
            else {
                const now = new Date();
                vencimento = new Date(Date.UTC(now.getFullYear(), now.getMonth(), (_c = cliente.diaMensalidade) !== null && _c !== void 0 ? _c : now.getDate(), 3, 0, 0, 0));
            }
            const mensalidade = yield this.mensalidadeService.createMensalidade({
                clienteId: cliente.id,
                valor: plano.valor,
                vencimento,
            }, transaction);
            if (!mensalidade) {
                throw new BadRequestError_1.BadRequestError('Erro ao criar mensalidade.');
            }
            return mensalidade;
        });
    }
};
exports.CreateMensalidadeService = CreateMensalidadeService;
exports.CreateMensalidadeService = CreateMensalidadeService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_mensalidade_service_1.MensalidadeService,
        _cliente_service_1.ClienteService,
        _plano_service_1.PlanoService])
], CreateMensalidadeService);

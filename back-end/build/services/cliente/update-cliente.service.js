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
exports.UpdateClienteService = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const NotFoundError_1 = require("../../errors/NotFoundError");
const _mensalidade_service_1 = require("../mensalidade/@mensalidade.service");
const _plano_service_1 = require("../plano/@plano.service");
const _cliente_service_1 = require("./@cliente.service");
let UpdateClienteService = class UpdateClienteService {
    constructor(clienteService, mensalidadeService, planoService) {
        this.clienteService = clienteService;
        this.mensalidadeService = mensalidadeService;
        this.planoService = planoService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || isNaN(id))
                throw new BadRequestError_1.BadRequestError('ID inválido.');
            const cliente = yield this.clienteService.getClienteById(id);
            if (!cliente)
                throw new NotFoundError_1.NotFoundError('Cliente não encontrado.');
            if (data.planoId && cliente.planoId !== data.planoId) {
                yield this.editMonthlyFeeIfPlanIdIsChanged(id, data.planoId);
            }
            const transformedData = this._transformData(data);
            if (transformedData.isento) {
                yield this.cancelMonthlyFeeIfCustomerIsExempt(id);
            }
            const updatedData = {
                nome: transformedData.nome ? transformedData.nome.trim().toUpperCase() : undefined,
                email: transformedData.email ? transformedData.email.trim().toLowerCase() : undefined,
                telefone: transformedData.telefone ? transformedData.telefone.trim() : undefined,
                catracaId: transformedData.catracaId ? Number(transformedData.catracaId) : undefined,
                planoId: transformedData.planoId ? Number(transformedData.planoId) : undefined,
                dataNascimento: transformedData.dataNascimento ? new Date(transformedData.dataNascimento) : undefined,
                diaMensalidade: transformedData.diaMensalidade ? Number(transformedData.diaMensalidade) : undefined,
                isento: typeof transformedData.isento === 'boolean' ? transformedData.isento : undefined,
            };
            return this.clienteService.updateCliente(id, updatedData);
        });
    }
    _transformData(data) {
        if (!data.dataNascimento) {
            throw new BadRequestError_1.BadRequestError('Data de nascimento é obrigatória.');
        }
        if (isNaN(Date.parse(data.dataNascimento))) {
            throw new BadRequestError_1.BadRequestError('Data de nascimento inválida.');
        }
        const date = new Date(data.dataNascimento);
        date.setHours(date.getHours() + 3);
        return Object.assign(Object.assign({}, data), { dataNascimento: date });
    }
    cancelMonthlyFeeIfCustomerIsExempt(clienteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [mensalidade] = yield this.mensalidadeService.findMensalidadesByClienteIdAndStatus(clienteId, client_1.StatusMensalidade.PENDENTE);
            if (!mensalidade)
                return;
            yield this.mensalidadeService.updateMensalidade(mensalidade.id, {
                status: client_1.StatusMensalidade.CANCELADO,
            });
        });
    }
    editMonthlyFeeIfPlanIdIsChanged(clienteId, newPlanoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [mensalidade] = yield this.mensalidadeService.findMensalidadesByClienteIdAndStatus(clienteId, client_1.StatusMensalidade.PENDENTE);
            const plano = yield this.planoService.getPlanoById(newPlanoId);
            if (!plano)
                throw new NotFoundError_1.NotFoundError('Plano não encontrado.');
            if (!mensalidade)
                return;
            const { valor } = plano;
            yield this.mensalidadeService.updateMensalidade(mensalidade.id, {
                valor,
            });
        });
    }
};
exports.UpdateClienteService = UpdateClienteService;
exports.UpdateClienteService = UpdateClienteService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_cliente_service_1.ClienteService,
        _mensalidade_service_1.MensalidadeService,
        _plano_service_1.PlanoService])
], UpdateClienteService);

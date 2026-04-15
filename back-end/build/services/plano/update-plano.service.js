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
exports.UpdatePlanoService = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const _plano_service_1 = require("./@plano.service");
const _cliente_service_1 = require("../cliente/@cliente.service");
const _mensalidade_service_1 = require("../mensalidade/@mensalidade.service");
const withTransaction_1 = require("../../utils/withTransaction");
const plano_periodo_1 = require("../../utils/plano-periodo");
let UpdatePlanoService = class UpdatePlanoService {
    constructor(planoService, clienteService, mensalidadeService) {
        this.planoService = planoService;
        this.clienteService = clienteService;
        this.mensalidadeService = mensalidadeService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._validateId(id);
            const plan = yield (0, withTransaction_1.withTransaction)((tx) => __awaiter(this, void 0, void 0, function* () {
                const existingPlan = yield this.planoService.getPlanoById(id, tx);
                if (!existingPlan) {
                    throw new BadRequestError_1.BadRequestError('Plano não encontrado');
                }
                yield this._validate(data, existingPlan);
                const normalizedData = this._normalize(data, existingPlan);
                const plan = yield this.planoService.updatePlano(id, normalizedData, tx);
                if (data.valor !== undefined && plan.valor !== existingPlan.valor) {
                    yield this._modifyValorExistingMonthlyFeePending(id, data.valor, tx);
                }
                return plan;
            }));
            return plan;
        });
    }
    _modifyValorExistingMonthlyFeePending(idPlano, newValor, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientes = yield this.clienteService.getAllClientesWithMensalidadeByPlanId(idPlano, transaction);
            yield Promise.all(clientes.map((cliente) => __awaiter(this, void 0, void 0, function* () {
                const mensalidade = cliente.Mensalidade.find((m) => m.status === client_1.StatusMensalidade.PENDENTE);
                if (mensalidade) {
                    yield this.mensalidadeService.updateMensalidade(mensalidade.id, { valor: newValor }, transaction);
                }
            })));
        });
    }
    _validateId(id) {
        if (!id || id <= 0 || isNaN(id)) {
            throw new BadRequestError_1.BadRequestError('ID inválido');
        }
    }
    _validate(data, existingPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (data.nome && data.nome.trim() === '') {
                throw new BadRequestError_1.BadRequestError('Nome é obrigatório');
            }
            if (data.descricao && data.descricao.length > 255) {
                throw new BadRequestError_1.BadRequestError('Descrição não pode exceder 255 caracteres');
            }
            if (data.valor !== undefined && (isNaN(data.valor) || data.valor <= 0)) {
                throw new BadRequestError_1.BadRequestError('Preço do plano deve ser maior que zero');
            }
            if (data.ativo !== undefined && typeof data.ativo !== 'boolean') {
                throw new BadRequestError_1.BadRequestError('Ativo deve ser um valor booleano');
            }
            if (data.tipo && !Object.values(client_1.TipoPlano).includes(data.tipo)) {
                throw new BadRequestError_1.BadRequestError('Tipo de plano inválido');
            }
            if (data.validarDiasSemana !== undefined && typeof data.validarDiasSemana !== 'boolean') {
                throw new BadRequestError_1.BadRequestError('validarDiasSemana deve ser um valor booleano');
            }
            const validarDias = (_a = data.validarDiasSemana) !== null && _a !== void 0 ? _a : existingPlan.validarDiasSemana;
            const diasValidos = data.validarDiasSemana === false ? null : (_b = data.diasValidosSemana) !== null && _b !== void 0 ? _b : existingPlan.diasValidosSemana;
            if (!validarDias) {
                return;
            }
            if (diasValidos === null || diasValidos === undefined) {
                throw new BadRequestError_1.BadRequestError('diasValidosSemana é obrigatório quando validarDiasSemana estiver ativo');
            }
            if (!Number.isInteger(diasValidos) || diasValidos <= 0) {
                throw new BadRequestError_1.BadRequestError('diasValidosSemana deve ser um número inteiro maior que zero');
            }
            if (diasValidos > plano_periodo_1.MAX_DIAS_VALIDOS_SEMANA) {
                throw new BadRequestError_1.BadRequestError(`diasValidosSemana não pode ser maior que ${plano_periodo_1.MAX_DIAS_VALIDOS_SEMANA} em uma semana`);
            }
        });
    }
    _normalize(data, existingPlan) {
        var _a, _b;
        const deveValidarDias = (_a = data.validarDiasSemana) !== null && _a !== void 0 ? _a : existingPlan.validarDiasSemana;
        const diasPermitidos = (_b = data.diasValidosSemana) !== null && _b !== void 0 ? _b : existingPlan.diasValidosSemana;
        return Object.assign(Object.assign({}, data), { diasValidosSemana: deveValidarDias ? diasPermitidos : null });
    }
};
exports.UpdatePlanoService = UpdatePlanoService;
exports.UpdatePlanoService = UpdatePlanoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_plano_service_1.PlanoService,
        _cliente_service_1.ClienteService,
        _mensalidade_service_1.MensalidadeService])
], UpdatePlanoService);

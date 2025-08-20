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
let UpdatePlanoService = class UpdatePlanoService {
    constructor(planoService, clienteService, mensalidadeService) {
        this.planoService = planoService;
        this.clienteService = clienteService;
        this.mensalidadeService = mensalidadeService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate(id, data);
            const plan = yield (0, withTransaction_1.withTransaction)((tx) => __awaiter(this, void 0, void 0, function* () {
                const existingPlan = yield this.planoService.getPlanoById(id, tx);
                if (!existingPlan) {
                    throw new BadRequestError_1.BadRequestError('Plano não encontrado');
                }
                const plan = yield this.planoService.updatePlano(id, data);
                if (data.valor && plan.valor !== existingPlan.valor) {
                    yield this.modifyValorExistingMonthlyFeePending(id, data.valor, tx);
                }
                return plan;
            }));
            return plan;
        });
    }
    modifyValorExistingMonthlyFeePending(idPlano, newValor, transaction) {
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
    validate(id, data) {
        if (!id || id <= 0 || isNaN(id)) {
            throw new BadRequestError_1.BadRequestError('ID inválido');
        }
        if (data.nome && data.nome.trim() === '') {
            throw new BadRequestError_1.BadRequestError('Nome é obrigatório');
        }
        if (data.descricao && data.descricao.length > 255) {
            throw new BadRequestError_1.BadRequestError('Descrição não pode exceder 255 caracteres');
        }
        if (data.valor && data.valor < 0) {
            throw new BadRequestError_1.BadRequestError('Preço não pode ser negativo');
        }
        if (data.ativo !== undefined && typeof data.ativo !== 'boolean') {
            throw new BadRequestError_1.BadRequestError('Ativo deve ser um valor booleano');
        }
    }
};
exports.UpdatePlanoService = UpdatePlanoService;
exports.UpdatePlanoService = UpdatePlanoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_plano_service_1.PlanoService,
        _cliente_service_1.ClienteService,
        _mensalidade_service_1.MensalidadeService])
], UpdatePlanoService);

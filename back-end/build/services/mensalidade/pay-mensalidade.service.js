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
exports.PayMensalidadeService = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const _mensalidade_service_1 = require("./@mensalidade.service");
const create_mensalida_service_1 = require("./create-mensalida.service");
const update_mensalidade_service_1 = require("./update-mensalidade.service");
const withTransaction_1 = require("../../utils/withTransaction");
let PayMensalidadeService = class PayMensalidadeService {
    constructor(mensalidadeService, createMensalidadeService, updateMensalidadeService) {
        this.mensalidadeService = mensalidadeService;
        this.createMensalidadeService = createMensalidadeService;
        this.updateMensalidadeService = updateMensalidadeService;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mensalidadeId, formaPagamento, valorPago, }) {
            const mensalidade = yield this.mensalidadeService.findMensalidadeById(mensalidadeId);
            if (!mensalidade) {
                throw new BadRequestError_1.BadRequestError('Mensalidade não encontrada.');
            }
            if (mensalidade.status !== client_1.StatusMensalidade.PENDENTE) {
                throw new BadRequestError_1.BadRequestError('Mensalidade não está pendente.');
            }
            const response = yield (0, withTransaction_1.withTransaction)((tx) => __awaiter(this, void 0, void 0, function* () {
                const mensalidade = yield this.updateMensalidadeService.execute(mensalidadeId, {
                    status: client_1.StatusMensalidade.PAGO,
                    formaPagamento,
                    valorPago,
                    dataPagamento: new Date(),
                }, tx);
                yield this.createMensalidadeService.execute({
                    clienteId: mensalidade.clienteId,
                    dataVencimentoAnterior: mensalidade.vencimento,
                }, tx);
                return mensalidade;
            }));
            return response;
        });
    }
};
exports.PayMensalidadeService = PayMensalidadeService;
exports.PayMensalidadeService = PayMensalidadeService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_mensalidade_service_1.MensalidadeService,
        create_mensalida_service_1.CreateMensalidadeService,
        update_mensalidade_service_1.UpdateMensalidadeService])
], PayMensalidadeService);

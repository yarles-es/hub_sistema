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
exports.UpdateMensalidadeService = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const _mensalidade_service_1 = require("./@mensalidade.service");
let UpdateMensalidadeService = class UpdateMensalidadeService {
    constructor(mensalidadeService) {
        this.mensalidadeService = mensalidadeService;
    }
    execute(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || isNaN(id) || id <= 0) {
                throw new BadRequestError_1.BadRequestError('ID inválido.');
            }
            yield this._validate(id, data.formaPagamento === null ? undefined : data.formaPagamento, data.status === null ? undefined : data.status);
            if (data.valorPago === undefined) {
                data.valorPago = null;
            }
            return yield this.mensalidadeService.updateMensalidade(id, data, transaction);
        });
    }
    _validate(id, formaPagamento, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || isNaN(id) || id <= 0) {
                throw new BadRequestError_1.BadRequestError('ID inválido');
            }
            const mensalidade = yield this.mensalidadeService.findMensalidadeById(id);
            if (!mensalidade) {
                throw new BadRequestError_1.BadRequestError('Mensalidade não encontrada');
            }
            if (formaPagamento && !Object.values(client_1.FormPagamento).includes(formaPagamento)) {
                throw new BadRequestError_1.BadRequestError('Forma de pagamento inválida');
            }
            if (status && !Object.values(client_1.StatusMensalidade).includes(status)) {
                throw new BadRequestError_1.BadRequestError('Status inválido');
            }
        });
    }
};
exports.UpdateMensalidadeService = UpdateMensalidadeService;
exports.UpdateMensalidadeService = UpdateMensalidadeService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_mensalidade_service_1.MensalidadeService])
], UpdateMensalidadeService);

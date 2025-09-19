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
exports.CreateClienteService = void 0;
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const validate_cel_1 = require("../../utils/validate-cel");
const create_mensalida_service_1 = require("../mensalidade/create-mensalida.service");
const _plano_service_1 = require("../plano/@plano.service");
const _cliente_service_1 = require("./@cliente.service");
let CreateClienteService = class CreateClienteService {
    constructor(clienteService, planoService, createMensalidadeService) {
        this.clienteService = clienteService;
        this.planoService = planoService;
        this.createMensalidadeService = createMensalidadeService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const transformedData = this._transformData(data);
            yield this.validate(transformedData);
            const result = yield this.clienteService.createCliente(transformedData);
            yield this.createMensalidadeService.execute({ clienteId: result.id });
            return result;
        });
    }
    validate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nome || data.nome.trim() === '') {
                throw new BadRequestError_1.BadRequestError('Nome é obrigatório.');
            }
            if (!data.email || data.email.trim() === '') {
                throw new BadRequestError_1.BadRequestError('E-mail é obrigatório.');
            }
            if (!data.planoId) {
                throw new BadRequestError_1.BadRequestError('Plano é obrigatório.');
            }
            const plano = yield this.planoService.getPlanoById(data.planoId);
            if (!plano) {
                throw new BadRequestError_1.BadRequestError('Plano não encontrado.');
            }
            const existingCliente = yield this.clienteService.getClienteByEmail(data.email);
            if (existingCliente) {
                throw new BadRequestError_1.BadRequestError('Já existe um cliente com este e-mail.');
            }
            if (data.telefone && !(0, validate_cel_1.validateCel)(data.telefone)) {
                throw new BadRequestError_1.BadRequestError('Número de celular inválido.');
            }
            if (data.diaMensalidade && (data.diaMensalidade < 1 || data.diaMensalidade > 31)) {
                throw new BadRequestError_1.BadRequestError('Dia da mensalidade deve ser entre 1 e 31.');
            }
        });
    }
    _transformData(data) {
        var _a;
        if (!data.dataNascimento) {
            throw new BadRequestError_1.BadRequestError('Data de nascimento é obrigatória.');
        }
        if (isNaN(Date.parse(data.dataNascimento))) {
            throw new BadRequestError_1.BadRequestError('Data de nascimento inválida.');
        }
        const date = new Date(data.dataNascimento);
        date.setHours(date.getHours() + 3);
        return Object.assign(Object.assign({}, data), { dataNascimento: date, diaMensalidade: (_a = data.diaMensalidade) !== null && _a !== void 0 ? _a : undefined });
    }
};
exports.CreateClienteService = CreateClienteService;
exports.CreateClienteService = CreateClienteService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_cliente_service_1.ClienteService,
        _plano_service_1.PlanoService,
        create_mensalida_service_1.CreateMensalidadeService])
], CreateClienteService);

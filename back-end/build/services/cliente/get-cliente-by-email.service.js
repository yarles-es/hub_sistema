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
exports.GetClienteByEmailService = void 0;
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const NotFoundError_1 = require("../../errors/NotFoundError");
const validate_email_1 = require("../../utils/validate-email");
const _cliente_service_1 = require("./@cliente.service");
let GetClienteByEmailService = class GetClienteByEmailService {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !(0, validate_email_1.validateEmail)(email) || email.trim() === '') {
                throw new BadRequestError_1.BadRequestError('Email inválido.');
            }
            const cliente = yield this.clienteService.getClienteByEmail(email);
            if (!cliente)
                throw new NotFoundError_1.NotFoundError('Cliente não encontrado.');
            return cliente;
        });
    }
};
exports.GetClienteByEmailService = GetClienteByEmailService;
exports.GetClienteByEmailService = GetClienteByEmailService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_cliente_service_1.ClienteService])
], GetClienteByEmailService);

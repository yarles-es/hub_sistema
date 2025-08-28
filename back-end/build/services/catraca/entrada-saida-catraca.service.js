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
exports.EntradasaidaCatracaService = void 0;
const typedi_1 = require("typedi");
const _registro_acesso_service_1 = require("../registro-acesso/@registro-acesso.service");
const _cliente_service_1 = require("../cliente/@cliente.service");
const bloquear_entrada_catraca_1 = require("../../api/catraca/bloquear-entrada-catraca");
const client_1 = require("@prisma/client");
const formatador_cliente_1 = require("../../utils/formatador-cliente");
const liberar_entrada_catraca_1 = require("../../api/catraca/liberar-entrada-catraca");
const liberar_saida_catraca_1 = require("../../api/catraca/liberar-saida-catraca");
let EntradasaidaCatracaService = class EntradasaidaCatracaService {
    constructor(registroAcessoService, clienteService) {
        this.registroAcessoService = registroAcessoService;
        this.clienteService = clienteService;
        this.TRAVAR = ['DESATIVADO', 'VENCIDO', 'MENSALIDADE_AUSENTE'];
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield this.getClienteForCommand(data);
            if (!cliente) {
                yield (0, bloquear_entrada_catraca_1.bloquearEntradaCatraca)();
                return;
            }
            const [clienteFormatado] = (0, formatador_cliente_1.formatadorCliente)([cliente]);
            if (!clienteFormatado.ativo) {
                yield this.bloqueioClienteInativo(cliente.id);
                return;
            }
            if (this.TRAVAR.includes(clienteFormatado.status)) {
                yield this.bloqueioClienteInativo(cliente.id);
                return;
            }
            yield this.entradaSaidaCatraca(cliente.id);
        });
    }
    bloqueioClienteInativo(clienteId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registroAcessoService.createRegistroAcesso({
                clienteId,
                tipoCatraca: client_1.TipoCatraca.BLOQUEIO,
                dataHora: new Date(),
            });
            yield (0, bloquear_entrada_catraca_1.bloquearEntradaCatraca)();
            return;
        });
    }
    getClienteForCommand(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = body.command;
            if (command === 774) {
                const id = body.response.identification.id;
                return yield this.clienteService.findByIdRegistro(id);
            }
            if (command === 771) {
                const data = body.response.identification.data;
                const date = yield this.transformDate(data);
                if (date) {
                    return yield this.clienteService.findByDataNascimento(date);
                }
            }
            return null;
        });
    }
    transformDate(data) {
        const strData = data.toString().padStart(8, '0');
        if (!/^\d{8}$/.test(strData))
            return null;
        const dia = strData.slice(0, 2);
        const mes = strData.slice(2, 4);
        const ano = strData.slice(4, 8);
        const date = new Date(`${ano}-${mes}-${dia}`);
        if (isNaN(date.getTime()))
            return null;
        return `${ano}-${mes}-${dia}`;
    }
    entradaSaidaCatraca(clienteId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const registrosAcesso = yield this.registroAcessoService.findAllRegistrosByClienteId(clienteId);
            const registrosAcessoFiltrado = registrosAcesso.filter((r) => r.tipoCatraca !== client_1.TipoCatraca.BLOQUEIO);
            if (registrosAcessoFiltrado.length === 0) {
                yield this.registroAcessoService.createRegistroAcesso({
                    clienteId,
                    tipoCatraca: client_1.TipoCatraca.ENTRADA,
                    dataHora: new Date(),
                });
                yield (0, liberar_entrada_catraca_1.liberarEntradaCatraca)();
                return;
            }
            if (((_a = registrosAcessoFiltrado[0]) === null || _a === void 0 ? void 0 : _a.tipoCatraca) === client_1.TipoCatraca.SAIDA) {
                yield this.registroAcessoService.createRegistroAcesso({
                    clienteId,
                    tipoCatraca: client_1.TipoCatraca.ENTRADA,
                    dataHora: new Date(),
                });
                yield (0, liberar_entrada_catraca_1.liberarEntradaCatraca)();
                return;
            }
            if (((_b = registrosAcessoFiltrado[0]) === null || _b === void 0 ? void 0 : _b.tipoCatraca) === client_1.TipoCatraca.ENTRADA) {
                yield this.registroAcessoService.createRegistroAcesso({
                    clienteId,
                    tipoCatraca: client_1.TipoCatraca.SAIDA,
                    dataHora: new Date(),
                });
                yield (0, liberar_saida_catraca_1.liberarSaidaCatraca)();
                return;
            }
            return;
        });
    }
};
exports.EntradasaidaCatracaService = EntradasaidaCatracaService;
exports.EntradasaidaCatracaService = EntradasaidaCatracaService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_registro_acesso_service_1.RegistroAcessoService,
        _cliente_service_1.ClienteService])
], EntradasaidaCatracaService);

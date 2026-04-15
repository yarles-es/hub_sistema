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
const plano_periodo_1 = require("../../utils/plano-periodo");
let EntradasaidaCatracaService = class EntradasaidaCatracaService {
    constructor(registroAcessoService, clienteService) {
        this.registroAcessoService = registroAcessoService;
        this.clienteService = clienteService;
        this.TRAVAR = ['DESATIVADO', 'VENCIDO', 'MENSALIDADE_AUSENTE'];
        this.TIPOS_BLOQUEIO = [
            client_1.TipoCatraca.BLOQUEIO,
            client_1.TipoCatraca.BLOQUEIO_ATRASO,
            client_1.TipoCatraca.BLOQUEIO_LIMITE_ACESSO,
        ];
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield this._obterClienteParaComando(data);
            if (!cliente) {
                yield (0, bloquear_entrada_catraca_1.bloquearEntradaCatraca)();
                return;
            }
            const [clienteFormatado] = (0, formatador_cliente_1.formatadorCliente)([cliente]);
            if (!clienteFormatado.ativo) {
                yield this._bloquearCliente(cliente.id, client_1.TipoCatraca.BLOQUEIO);
                return;
            }
            if (this.TRAVAR.includes(clienteFormatado.status)) {
                yield this._bloquearCliente(cliente.id, this._obterTipoBloqueioPorStatus(clienteFormatado.status));
                return;
            }
            yield this._entradaSaidaCatraca(cliente);
        });
    }
    _bloquearCliente(clienteId, tipoCatraca) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registroAcessoService.createRegistroAcesso({
                clienteId,
                tipoCatraca,
                dataHora: new Date(),
            });
            yield (0, bloquear_entrada_catraca_1.bloquearEntradaCatraca)();
            return;
        });
    }
    _obterClienteParaComando(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = body.command;
            if (command === 774) {
                const id = body.response.identification.id;
                return yield this.clienteService.findByIdRegistro(id);
            }
            if (command === 771) {
                const data = body.response.identification.data;
                const dataFormatada = this._transformarData(data);
                if (dataFormatada) {
                    return yield this.clienteService.findByDataNascimento(dataFormatada);
                }
            }
            return null;
        });
    }
    _transformarData(data) {
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
    _entradaSaidaCatraca(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const registrosAcesso = yield this.registroAcessoService.findAllRegistrosByClienteId(cliente.id);
            const registrosAcessoFiltrado = registrosAcesso.filter((r) => !this.TIPOS_BLOQUEIO.includes(r.tipoCatraca));
            if (registrosAcessoFiltrado.length === 0) {
                const podeEntrar = yield this._podeClienteEntrarPorDiasValidosSemana(cliente);
                if (!podeEntrar) {
                    yield this._bloquearCliente(cliente.id, client_1.TipoCatraca.BLOQUEIO_LIMITE_ACESSO);
                    return;
                }
                yield this.registroAcessoService.createRegistroAcesso({
                    clienteId: cliente.id,
                    tipoCatraca: client_1.TipoCatraca.ENTRADA,
                    dataHora: new Date(),
                });
                yield (0, liberar_entrada_catraca_1.liberarEntradaCatraca)();
                return;
            }
            if (((_a = registrosAcessoFiltrado[0]) === null || _a === void 0 ? void 0 : _a.tipoCatraca) === client_1.TipoCatraca.SAIDA) {
                const podeEntrar = yield this._podeClienteEntrarPorDiasValidosSemana(cliente);
                if (!podeEntrar) {
                    yield this._bloquearCliente(cliente.id, client_1.TipoCatraca.BLOQUEIO_LIMITE_ACESSO);
                    return;
                }
                yield this.registroAcessoService.createRegistroAcesso({
                    clienteId: cliente.id,
                    tipoCatraca: client_1.TipoCatraca.ENTRADA,
                    dataHora: new Date(),
                });
                yield (0, liberar_entrada_catraca_1.liberarEntradaCatraca)();
                return;
            }
            if (((_b = registrosAcessoFiltrado[0]) === null || _b === void 0 ? void 0 : _b.tipoCatraca) === client_1.TipoCatraca.ENTRADA) {
                yield this.registroAcessoService.createRegistroAcesso({
                    clienteId: cliente.id,
                    tipoCatraca: client_1.TipoCatraca.SAIDA,
                    dataHora: new Date(),
                });
                yield (0, liberar_saida_catraca_1.liberarSaidaCatraca)();
                return;
            }
            return;
        });
    }
    _podeClienteEntrarPorDiasValidosSemana(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cliente.plano.validarDiasSemana) {
                return true;
            }
            const diasValidos = cliente.plano.diasValidosSemana;
            if (!diasValidos || diasValidos <= 0) {
                return false;
            }
            const agora = new Date();
            if ((0, plano_periodo_1.isDomingo)(agora)) {
                return true;
            }
            const { inicioSemana, fimSemana } = (0, plano_periodo_1.obterIntervaloSemanaAtual)(agora);
            const entradas = yield this.registroAcessoService.findEntradasByClienteIdAndPeriod(cliente.id, inicioSemana, fimSemana);
            const diasUtilizados = new Set(entradas
                .filter((entrada) => !(0, plano_periodo_1.isDomingo)(entrada.dataHora))
                .map((entrada) => this._obterChaveDia(entrada.dataHora)));
            const chaveHoje = this._obterChaveDia(agora);
            if (diasUtilizados.has(chaveHoje)) {
                return true;
            }
            return diasUtilizados.size < diasValidos;
        });
    }
    _obterChaveDia(data) {
        const dataAtual = new Date(data);
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }
    _obterTipoBloqueioPorStatus(status) {
        if (status === 'VENCIDO') {
            return client_1.TipoCatraca.BLOQUEIO_ATRASO;
        }
        return client_1.TipoCatraca.BLOQUEIO;
    }
};
exports.EntradasaidaCatracaService = EntradasaidaCatracaService;
exports.EntradasaidaCatracaService = EntradasaidaCatracaService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_registro_acesso_service_1.RegistroAcessoService,
        _cliente_service_1.ClienteService])
], EntradasaidaCatracaService);

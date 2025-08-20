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
exports.EtapasCadastroBiometriaService = void 0;
const typedi_1 = require("typedi");
const _cadastro_biometria_service_1 = require("./@cadastro-biometria.service");
const messagesBiometria_1 = require("../../constants/messagesBiometria");
const _cliente_service_1 = require("../cliente/@cliente.service");
const withTransaction_1 = require("../../utils/withTransaction");
const cancelar_operacao_biometria_1 = require("../../api/biometria/cancelar-operacao-biometria");
const bloquear_entrada_catraca_1 = require("../../api/catraca/bloquear-entrada-catraca");
const notificacao_positiva_1 = require("../../api/catraca/notificacao-positiva");
const client_1 = require("@prisma/client");
let EtapasCadastroBiometriaService = class EtapasCadastroBiometriaService {
    constructor(cadastroBiometriaService, clienteService) {
        this.cadastroBiometriaService = cadastroBiometriaService;
        this.clienteService = clienteService;
    }
    executeError(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { response: { enrollStatus: { description, isSuccess }, }, } = body;
            if (description && description === messagesBiometria_1.messageFailToRegisterBiometria && !isSuccess) {
                yield this.failRegister();
                yield (0, bloquear_entrada_catraca_1.bloquearEntradaCatraca)();
            }
        });
    }
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.typeGuard(body)) {
                return;
            }
            else {
                const { response: { enroll }, } = body;
                if (enroll === messagesBiometria_1.messageFirstTimeRegisterBiometria)
                    return;
                if (enroll === messagesBiometria_1.messageSecondTimeRegisterBiometria)
                    yield this.executeSecondStep();
                if (enroll === messagesBiometria_1.messageThirdTimeRegisterBiometria)
                    yield this.executeThirdStep();
                if (enroll === messagesBiometria_1.messageSucessRegisterBiometria)
                    yield this.executeFinalStep();
            }
        });
    }
    executeSecondStep() {
        return __awaiter(this, void 0, void 0, function* () {
            const cadastroBiometria = yield this.cadastroBiometriaService.findFirst();
            if (!cadastroBiometria) {
                yield this.failRegister();
                return;
            }
            yield this.cadastroBiometriaService.update(cadastroBiometria.id, {
                segundaEtapa: true,
            });
        });
    }
    executeThirdStep() {
        return __awaiter(this, void 0, void 0, function* () {
            const cadastroBiometria = yield this.cadastroBiometriaService.findFirst();
            if (!cadastroBiometria) {
                yield this.failRegister();
                return;
            }
            yield this.cadastroBiometriaService.update(cadastroBiometria.id, {
                terceiraEtapa: true,
            });
        });
    }
    executeFinalStep() {
        return __awaiter(this, void 0, void 0, function* () {
            const cadastroBiometria = yield this.cadastroBiometriaService.findFirst();
            if (!cadastroBiometria) {
                yield this.failRegister();
                return;
            }
            try {
                yield (0, withTransaction_1.withTransaction)((tx) => __awaiter(this, void 0, void 0, function* () {
                    yield this.clienteService.updateCliente(cadastroBiometria.clienteId, { catracaId: cadastroBiometria.idCatraca }, tx);
                }));
                yield this.cadastroBiometriaService.update(cadastroBiometria.id, { success: true });
                yield (0, cancelar_operacao_biometria_1.cancelarOperacaoBiometria)();
                yield (0, notificacao_positiva_1.notificacaoPositiva)();
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                    yield this.failRegister();
                    return;
                }
                yield this.failRegister();
            }
        });
    }
    failRegister() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cadastroBiometria = yield this.cadastroBiometriaService.findFirst();
                if (!cadastroBiometria)
                    return;
                yield this.cadastroBiometriaService.update(cadastroBiometria.id, {
                    errorMessage: 'Erro ao registrar biometria',
                });
                yield (0, cancelar_operacao_biometria_1.cancelarOperacaoBiometria)();
            }
            catch (error) {
                console.error('Erro incomum nas etapas de registro de biometria:', error);
                return;
            }
        });
    }
    typeGuard(body) {
        return (body !== null &&
            typeof body === 'object' &&
            'response' in body &&
            typeof body.response === 'object' &&
            'data' in body.response &&
            typeof body.response.data === 'object' &&
            'content' in body.response.data);
    }
};
exports.EtapasCadastroBiometriaService = EtapasCadastroBiometriaService;
exports.EtapasCadastroBiometriaService = EtapasCadastroBiometriaService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_cadastro_biometria_service_1.CadastroBiometriaService,
        _cliente_service_1.ClienteService])
], EtapasCadastroBiometriaService);

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
exports.IniciarCadastroBiometriaService = void 0;
const typedi_1 = require("typedi");
const _cadastro_biometria_service_1 = require("./@cadastro-biometria.service");
const _cliente_service_1 = require("../cliente/@cliente.service");
const NotFoundError_1 = require("../../errors/NotFoundError");
const busca_id_disponivel_registro_service_1 = require("./busca-id-disponivel-registro.service");
const BadRequestError_1 = require("../../errors/BadRequestError");
const iniciar_cadastro_biometria_1 = require("../../api/biometria/iniciar-cadastro-biometria");
let IniciarCadastroBiometriaService = class IniciarCadastroBiometriaService {
    constructor(cadastroBiometriaService, clienteService, buscaIdDisponivelRegistroService) {
        this.cadastroBiometriaService = cadastroBiometriaService;
        this.clienteService = clienteService;
        this.buscaIdDisponivelRegistroService = buscaIdDisponivelRegistroService;
    }
    execute(clienteId, idCatraca) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validate(clienteId, idCatraca);
            const cadastroBiometria = yield this.cadastroBiometriaService.findFirst();
            if (cadastroBiometria) {
                yield this.cadastroBiometriaService.delete(cadastroBiometria.id);
            }
            const result = yield this.cadastroBiometriaService.create({ clienteId, idCatraca });
            yield (0, iniciar_cadastro_biometria_1.iniciarCadastroBiometria)(idCatraca);
            return result;
        });
    }
    validate(clienteId, idCatraca) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield this.clienteService.getClienteById(clienteId);
            if (!cliente) {
                throw new NotFoundError_1.NotFoundError('Cliente não encontrado');
            }
            if (cliente.catracaId) {
                throw new BadRequestError_1.BadRequestError('Cliente já possui cadastro de biometria registrado');
            }
            const id = yield this.buscaIdDisponivelRegistroService.execute();
            if (id !== idCatraca) {
                throw new BadRequestError_1.BadRequestError('O id disponível enviado não corresponde ao id disponivel da catraca');
            }
        });
    }
};
exports.IniciarCadastroBiometriaService = IniciarCadastroBiometriaService;
exports.IniciarCadastroBiometriaService = IniciarCadastroBiometriaService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_cadastro_biometria_service_1.CadastroBiometriaService,
        _cliente_service_1.ClienteService,
        busca_id_disponivel_registro_service_1.BuscaIdDisponivelRegistroService])
], IniciarCadastroBiometriaService);

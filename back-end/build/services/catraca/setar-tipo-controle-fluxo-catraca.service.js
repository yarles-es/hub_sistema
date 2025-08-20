"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.SetarTipoControleFluxoCatracaService = void 0;
const typedi_1 = require("typedi");
const setar_tipo_controle_fluxo_catraca_1 = require("../../api/catraca/setar-tipo-controle-fluxo-catraca");
const BadRequestError_1 = require("../../errors/BadRequestError");
// modo fluxo:
// 0 - nenhum;
// 1 = controla entrada com saida liberada
// 2 = controla saida com entrada liberada
// 3 = controla entrada e saida
let SetarTipoControleFluxoCatracaService = class SetarTipoControleFluxoCatracaService {
    execute(tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!tipo || typeof tipo !== 'number') {
                    throw new BadRequestError_1.BadRequestError('Tipo de controle de fluxo inválido');
                }
                if (tipo < 0 || tipo > 3) {
                    throw new BadRequestError_1.BadRequestError('Tipo de controle de fluxo inválido');
                }
                yield (0, setar_tipo_controle_fluxo_catraca_1.setarTipoControleFluxoCatraca)(tipo);
            }
            catch (error) {
                throw new BadRequestError_1.BadRequestError('Erro ao definir o tipo de controle de fluxo da catraca');
            }
        });
    }
};
exports.SetarTipoControleFluxoCatracaService = SetarTipoControleFluxoCatracaService;
exports.SetarTipoControleFluxoCatracaService = SetarTipoControleFluxoCatracaService = __decorate([
    (0, typedi_1.Service)()
], SetarTipoControleFluxoCatracaService);

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
exports.SetarDuracaoInteracaoCatracaService = void 0;
const typedi_1 = require("typedi");
const setar_duracao_interacao_catraca_1 = require("../../api/catraca/setar-duracao-interacao-catraca");
const BadRequestError_1 = require("../../errors/BadRequestError");
let SetarDuracaoInteracaoCatracaService = class SetarDuracaoInteracaoCatracaService {
    execute(duracao) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const segundos = duracao / 1000;
                if (!Number.isInteger(segundos)) {
                    throw new BadRequestError_1.BadRequestError('A duração deve ser um número inteiro.');
                }
                if (segundos > 30) {
                    throw new BadRequestError_1.BadRequestError('A duração não pode ser maior que 30 segundos.');
                }
                yield (0, setar_duracao_interacao_catraca_1.setarDuracaoInteracaoCatraca)(duracao);
            }
            catch (error) {
                throw new BadRequestError_1.BadRequestError(`Erro ao definir a duração da interação`);
            }
        });
    }
};
exports.SetarDuracaoInteracaoCatracaService = SetarDuracaoInteracaoCatracaService;
exports.SetarDuracaoInteracaoCatracaService = SetarDuracaoInteracaoCatracaService = __decorate([
    (0, typedi_1.Service)()
], SetarDuracaoInteracaoCatracaService);

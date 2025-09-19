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
exports.CreatePlanoService = void 0;
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const _plano_service_1 = require("./@plano.service");
let CreatePlanoService = class CreatePlanoService {
    constructor(planoService) {
        this.planoService = planoService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._validate(data);
            return this.planoService.createPlano(data);
        });
    }
    _validate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nome || data.nome.trim() === '') {
                throw new BadRequestError_1.BadRequestError('Nome do plano é obrigatório');
            }
            const planoExistente = yield this.planoService.getPlanoByName(data.nome);
            if (planoExistente) {
                throw new BadRequestError_1.BadRequestError('Já existe um plano com este nome');
            }
            if (data.descricao && data.descricao.length > 255) {
                throw new BadRequestError_1.BadRequestError('Descrição não pode exceder 255 caracteres');
            }
            if (!data.valor || isNaN(data.valor)) {
                throw new BadRequestError_1.BadRequestError('Preço do plano é obrigatório');
            }
            if (data.valor < 0) {
                throw new BadRequestError_1.BadRequestError('Preço não pode ser negativo');
            }
        });
    }
};
exports.CreatePlanoService = CreatePlanoService;
exports.CreatePlanoService = CreatePlanoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_plano_service_1.PlanoService])
], CreatePlanoService);

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
exports.PlanoService = void 0;
const typedi_1 = require("typedi");
const plano_model_1 = require("../../models/plano.model");
let PlanoService = class PlanoService {
    constructor() {
        this.planoModel = new plano_model_1.PlanoModel();
    }
    createPlano(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const planotransformed = Object.assign(Object.assign({}, data), { nome: data.nome.trim().toUpperCase(), descricao: data.descricao ? data.descricao.trim().toLowerCase() : null });
            return this.planoModel.create(planotransformed, transaction);
        });
    }
    getPlanoByName(nome, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.planoModel.findByName(nome.trim().toUpperCase(), transaction);
        });
    }
    getPlanoById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.planoModel.findById(id, transaction);
        });
    }
    updatePlano(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.planoModel.update(id, data, transaction);
        });
    }
    deletePlano(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.planoModel.delete(id, transaction);
        });
    }
    getAllPlanos(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.planoModel.findAll(transaction);
        });
    }
};
exports.PlanoService = PlanoService;
exports.PlanoService = PlanoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], PlanoService);

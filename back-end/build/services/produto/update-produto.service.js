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
exports.UpdateProdutoService = void 0;
const typedi_1 = require("typedi");
const _produto_service_1 = require("./@produto.service");
const BadRequestError_1 = require("../../errors/BadRequestError");
let UpdateProdutoService = class UpdateProdutoService {
    constructor(produtoService) {
        this.produtoService = produtoService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || isNaN(id) || id <= 0)
                throw new BadRequestError_1.BadRequestError('ID inválido');
            this._validate(data);
            return yield this.produtoService.update(id, data);
        });
    }
    _validate(data) {
        if (data.nome !== undefined && typeof data.nome !== 'string') {
            throw new BadRequestError_1.BadRequestError('Nome deve ser string');
        }
        if (data.valorVenda !== undefined && typeof data.valorVenda !== 'number') {
            throw new BadRequestError_1.BadRequestError('Valor de venda deve ser número');
        }
        if (data.valorCusto !== undefined && typeof data.valorCusto !== 'number') {
            throw new BadRequestError_1.BadRequestError('Valor de custo deve ser número');
        }
        if (data.estoque !== undefined && typeof data.estoque !== 'number') {
            throw new BadRequestError_1.BadRequestError('Estoque deve ser número');
        }
        if (data.ativo !== undefined && typeof data.ativo !== 'boolean') {
            throw new BadRequestError_1.BadRequestError('Ativo deve ser booleano');
        }
    }
};
exports.UpdateProdutoService = UpdateProdutoService;
exports.UpdateProdutoService = UpdateProdutoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_produto_service_1.ProdutoService])
], UpdateProdutoService);

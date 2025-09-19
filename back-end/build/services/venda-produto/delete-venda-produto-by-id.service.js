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
exports.DeleteVendaProdutoByIdService = void 0;
const typedi_1 = require("typedi");
const _venda_produto_service_1 = require("./@venda-produto.service");
const _produto_service_1 = require("../produto/@produto.service");
const NotFoundError_1 = require("../../errors/NotFoundError");
let DeleteVendaProdutoByIdService = class DeleteVendaProdutoByIdService {
    constructor(vendaProdutoService, produtoService) {
        this.vendaProdutoService = vendaProdutoService;
        this.produtoService = produtoService;
    }
    execute(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, atualizarEstoque = true) {
            const { vendaProduto, produto } = yield this._validate(id);
            if (atualizarEstoque) {
                const estoqueAtualizado = produto.estoque + vendaProduto.quantidade;
                yield this.produtoService.update(produto.id, { estoque: estoqueAtualizado });
            }
            const vendaProdutoDeletado = yield this.vendaProdutoService.deleteById(id);
            if (!vendaProdutoDeletado)
                throw new NotFoundError_1.NotFoundError('Venda de produto não encontrada para deletar');
            return vendaProdutoDeletado;
        });
    }
    _validate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendaProduto = yield this.vendaProdutoService.getById(id);
            if (!vendaProduto)
                throw new NotFoundError_1.NotFoundError('Venda de produto não encontrada');
            const produto = yield this.produtoService.getById(vendaProduto.produtoId);
            if (!produto)
                throw new NotFoundError_1.NotFoundError('Produto não encontrado');
            return { vendaProduto, produto };
        });
    }
};
exports.DeleteVendaProdutoByIdService = DeleteVendaProdutoByIdService;
exports.DeleteVendaProdutoByIdService = DeleteVendaProdutoByIdService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_venda_produto_service_1.VendaProdutoService,
        _produto_service_1.ProdutoService])
], DeleteVendaProdutoByIdService);

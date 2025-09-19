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
exports.CreateVendaProdutoService = void 0;
const typedi_1 = require("typedi");
const _venda_produto_service_1 = require("./@venda-produto.service");
const _produto_service_1 = require("../produto/@produto.service");
const BadRequestError_1 = require("../../errors/BadRequestError");
let CreateVendaProdutoService = class CreateVendaProdutoService {
    constructor(vendaProdutoService, produtoService) {
        this.vendaProdutoService = vendaProdutoService;
        this.produtoService = produtoService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { produto, valorCusto } = yield this._validate(data);
            const { estoque } = produto;
            const newData = Object.assign(Object.assign({}, data), { valorCusto: valorCusto * data.quantidade });
            const novoEstoque = estoque - data.quantidade;
            yield this.produtoService.update(produto.id, { estoque: novoEstoque });
            const response = yield this.vendaProdutoService.create(newData);
            return response;
        });
    }
    _validate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const produto = yield this.produtoService.getById(data.produtoId);
            if (!produto)
                throw new BadRequestError_1.BadRequestError('Produto não encontrado');
            const valorCusto = produto.valorCusto;
            if (produto.estoque < data.quantidade)
                throw new BadRequestError_1.BadRequestError('Estoque insuficiente');
            if (data.valorVenda <= 0)
                throw new BadRequestError_1.BadRequestError('Valor de venda deve ser maior que zero');
            if (data.quantidade <= 0)
                throw new BadRequestError_1.BadRequestError('Quantidade deve ser maior que zero');
            return { produto, valorCusto };
        });
    }
};
exports.CreateVendaProdutoService = CreateVendaProdutoService;
exports.CreateVendaProdutoService = CreateVendaProdutoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_venda_produto_service_1.VendaProdutoService,
        _produto_service_1.ProdutoService])
], CreateVendaProdutoService);

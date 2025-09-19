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
exports.DeleteProdutoService = void 0;
const typedi_1 = require("typedi");
const _produto_service_1 = require("./@produto.service");
const _venda_produto_service_1 = require("../venda-produto/@venda-produto.service");
const withTransaction_1 = require("../../utils/withTransaction");
const BadRequestError_1 = require("../../errors/BadRequestError");
let DeleteProdutoService = class DeleteProdutoService {
    constructor(produtoService, vendaProdutoService) {
        this.produtoService = produtoService;
        this.vendaProdutoService = vendaProdutoService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, withTransaction_1.withTransaction)((t) => __awaiter(this, void 0, void 0, function* () {
                const produto = yield this.produtoService.getById(id, t);
                if (!produto)
                    throw new BadRequestError_1.BadRequestError('Produto não encontrado');
                const vendasComProduto = yield this.vendaProdutoService.getByProductId(id, t);
                if (vendasComProduto.length > 0) {
                    yield this.vendaProdutoService.deleteByProductId(id, t);
                }
                const response = yield this.produtoService.delete(id, t);
                return response;
            }));
            return result;
        });
    }
};
exports.DeleteProdutoService = DeleteProdutoService;
exports.DeleteProdutoService = DeleteProdutoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_produto_service_1.ProdutoService,
        _venda_produto_service_1.VendaProdutoService])
], DeleteProdutoService);

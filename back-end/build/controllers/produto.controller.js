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
exports.ProdutoController = void 0;
const typedi_1 = require("typedi");
const create_produto_service_1 = require("../services/produto/create-produto.service");
const get_all_produtos_service_1 = require("../services/produto/get-all-produtos.service");
const get_produto_by_id_service_1 = require("../services/produto/get-produto-by-id.service");
const update_produto_service_1 = require("../services/produto/update-produto.service");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
const delete_product_service_1 = require("../services/produto/delete-product.service");
let ProdutoController = class ProdutoController {
    constructor(createProdutoService, getAllProdutosService, getProdutoByIdService, updateProdutoService, deleteProdutoService, log) {
        this.createProdutoService = createProdutoService;
        this.getAllProdutosService = getAllProdutosService;
        this.getProdutoByIdService = getProdutoByIdService;
        this.updateProdutoService = updateProdutoService;
        this.deleteProdutoService = deleteProdutoService;
        this.log = log;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const data = req.body;
                const produto = yield this.createProdutoService.execute(data);
                yield this.log.execute(user.id, `Criou produto ${produto.nome}`);
                res.status(201).json(produto);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const produtos = yield this.getAllProdutosService.execute();
                res.status(200).json(produtos);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const produto = yield this.getProdutoByIdService.execute(id);
                res.status(200).json(produto);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const id = parseInt(req.params.id, 10);
                const data = req.body;
                const produto = yield this.updateProdutoService.execute(id, data);
                yield this.log.execute(user.id, `Atualizou produto ${produto.nome}`);
                res.status(200).json(produto);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const id = parseInt(req.params.id, 10);
                const produto = yield this.deleteProdutoService.execute(id);
                yield this.log.execute(user.id, `Deletou produto ${produto.nome}`);
                res.status(200).json(produto);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.ProdutoController = ProdutoController;
exports.ProdutoController = ProdutoController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [create_produto_service_1.CreateProdutoService,
        get_all_produtos_service_1.GetAllProdutosService,
        get_produto_by_id_service_1.GetProdutoByIdService,
        update_produto_service_1.UpdateProdutoService,
        delete_product_service_1.DeleteProdutoService,
        create_log_service_1.CreateLogService])
], ProdutoController);

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
exports.VendaProdutoController = void 0;
const typedi_1 = require("typedi");
const create_venda_produto_service_1 = require("../services/venda-produto/create-venda-produto.service");
const delete_venda_produto_by_id_service_1 = require("../services/venda-produto/delete-venda-produto-by-id.service");
const get_all_venda_produto_service_1 = require("../services/venda-produto/get-all-venda-produto.service");
const get_by_id_venda_produto_service_1 = require("../services/venda-produto/get-by-id-venda-produto.service");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
const get_venda_produtos_by_produto_id_service_1 = require("../services/venda-produto/get-venda-produtos-by-produto-id.service");
const safeTypes_1 = require("../utils/safeTypes");
const date_range_1 = require("../utils/date-range");
let VendaProdutoController = class VendaProdutoController {
    constructor(createVendaProdutoService, deleteVendaProdutoService, getAllVendaProdutoService, getByIdVendaProdutoService, getVendaProdutosByProdutoIdService, log) {
        this.createVendaProdutoService = createVendaProdutoService;
        this.deleteVendaProdutoService = deleteVendaProdutoService;
        this.getAllVendaProdutoService = getAllVendaProdutoService;
        this.getByIdVendaProdutoService = getByIdVendaProdutoService;
        this.getVendaProdutosByProdutoIdService = getVendaProdutosByProdutoIdService;
        this.log = log;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const vendaProduto = yield this.createVendaProdutoService.execute(req.body);
                yield this.log.execute(user.id, `Criou uma venda de produto com ID ${vendaProduto.id}`);
                res.status(201).json(vendaProduto);
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
                const { id } = req.params;
                const response = yield this.deleteVendaProdutoService.execute(Number(id));
                yield this.log.execute(user.id, `Deletou uma venda de produto com ID ${id}`);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numberPage, limit, initialDate, finalDate, productId } = req.query;
                const pageNumber = (0, safeTypes_1.safeParseInt)(numberPage) || 1;
                const limitNumber = (0, safeTypes_1.safeParseInt)(limit) || 30;
                const productIdNumber = (0, safeTypes_1.safeParseInt)(productId);
                const { startAtUtc, endAtUtc } = (0, date_range_1.buildUtcRange)(initialDate, finalDate);
                const vendaProdutos = yield this.getAllVendaProdutoService.execute(pageNumber, limitNumber, {
                    productId: productIdNumber,
                    initialDate: startAtUtc,
                    finalDate: endAtUtc,
                });
                res.status(200).json(vendaProdutos);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const vendaProduto = yield this.getByIdVendaProdutoService.execute(Number(id));
                res.status(200).json(vendaProduto);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByProdutoId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { produtoId } = req.params;
                const vendaProdutos = yield this.getVendaProdutosByProdutoIdService.execute(Number(produtoId));
                res.status(200).json(vendaProdutos);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.VendaProdutoController = VendaProdutoController;
exports.VendaProdutoController = VendaProdutoController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [create_venda_produto_service_1.CreateVendaProdutoService,
        delete_venda_produto_by_id_service_1.DeleteVendaProdutoByIdService,
        get_all_venda_produto_service_1.GetAllVendaProdutoService,
        get_by_id_venda_produto_service_1.GetByIdVendaProdutoService,
        get_venda_produtos_by_produto_id_service_1.GetVendaProdutosByProdutoIdService,
        create_log_service_1.CreateLogService])
], VendaProdutoController);

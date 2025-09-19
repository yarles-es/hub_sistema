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
exports.VendaProdutoService = void 0;
const typedi_1 = require("typedi");
const venda_produtos_model_1 = require("../../models/venda-produtos.model");
let VendaProdutoService = class VendaProdutoService {
    constructor(vendaProdutoModel) {
        this.vendaProdutoModel = vendaProdutoModel;
    }
    create(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaProdutoModel.create(data, transaction);
        });
    }
    getById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaProdutoModel.getById(id, transaction);
        });
    }
    getAll(page, limit, filters, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaProdutoModel.getAll(page, limit, filters, transaction);
        });
    }
    deleteById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaProdutoModel.deleteById(id, transaction);
        });
    }
    update(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaProdutoModel.update(data, transaction);
        });
    }
    getByProductId(productId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaProdutoModel.getByProductId(productId, transaction);
        });
    }
    deleteByProductId(productId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaProdutoModel.deleteByProductId(productId, transaction);
        });
    }
};
exports.VendaProdutoService = VendaProdutoService;
exports.VendaProdutoService = VendaProdutoService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [venda_produtos_model_1.VendaProdutoModel])
], VendaProdutoService);

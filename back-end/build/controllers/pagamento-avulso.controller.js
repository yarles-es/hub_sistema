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
exports.PagamentoAvulsoController = void 0;
const typedi_1 = require("typedi");
const create_pagamento_avulso_service_1 = require("../services/pagamento-avulso/create-pagamento-avulso.service");
const delete_pagamento_avulso_service_1 = require("../services/pagamento-avulso/delete-pagamento-avulso.service");
const get_all_pagamentos_avulso_service_1 = require("../services/pagamento-avulso/get-all-pagamentos-avulso.service");
const get_pagamento_avulso_by_id_service_1 = require("../services/pagamento-avulso/get-pagamento-avulso-by-id.service");
const update_pagamento_avulso_service_1 = require("../services/pagamento-avulso/update-pagamento-avulso.service");
const safeTypes_1 = require("../utils/safeTypes");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
const date_range_1 = require("../utils/date-range");
let PagamentoAvulsoController = class PagamentoAvulsoController {
    constructor(createPagamentoAvulsoService, deletePagamentoAvulsoService, getPagamentoAvulsoByIdService, updatePagamentoAvulsoService, getAllPagamentosAvulsoService, log) {
        this.createPagamentoAvulsoService = createPagamentoAvulsoService;
        this.deletePagamentoAvulsoService = deletePagamentoAvulsoService;
        this.getPagamentoAvulsoByIdService = getPagamentoAvulsoByIdService;
        this.updatePagamentoAvulsoService = updatePagamentoAvulsoService;
        this.getAllPagamentosAvulsoService = getAllPagamentosAvulsoService;
        this.log = log;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const pagamento = yield this.createPagamentoAvulsoService.execute(req.body);
                yield this.log.execute(user.id, `Criou diária id: ${pagamento.id}`);
                res.status(201).json(pagamento);
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
                yield this.deletePagamentoAvulsoService.execute(id);
                yield this.log.execute(user.id, `Deletou diária id: ${id}`);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const id = parseInt(req.params.id, 10);
                const pagamento = yield this.getPagamentoAvulsoByIdService.execute(id);
                yield this.log.execute(user.id, `Consultou diária id: ${pagamento.id}`);
                res.status(200).json(pagamento);
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
                const updatedPagamento = yield this.updatePagamentoAvulsoService.execute(id, req.body);
                yield this.log.execute(user.id, `Atualizou diária id: ${updatedPagamento.id}`);
                res.status(200).json(updatedPagamento);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numberPage, limit, initialDate, finalDate, observacao, nomeCliente, formaPagamento } = req.query;
                const limitNumber = (0, safeTypes_1.safeParseInt)(limit) || 30;
                const page = (0, safeTypes_1.safeParseInt)(numberPage) || 1;
                const observacaoValue = (0, safeTypes_1.safeParseString)(observacao);
                const nomeClienteValue = (0, safeTypes_1.safeParseString)(nomeCliente);
                const formaPagamentoValue = (0, safeTypes_1.safeParseFormPagamentoArray)(formaPagamento);
                const { startAtUtc, endAtUtc } = (0, date_range_1.buildUtcRange)(initialDate, finalDate);
                const pagamentos = yield this.getAllPagamentosAvulsoService.execute(page, limitNumber, {
                    initialDate: startAtUtc,
                    finalDate: endAtUtc,
                    observacao: observacaoValue,
                    nomeCliente: nomeClienteValue,
                    formaPagamento: formaPagamentoValue,
                });
                res.status(200).json(pagamentos);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.PagamentoAvulsoController = PagamentoAvulsoController;
exports.PagamentoAvulsoController = PagamentoAvulsoController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [create_pagamento_avulso_service_1.CreatePagamentoAvulsoService,
        delete_pagamento_avulso_service_1.DeletePagamentoAvulsoService,
        get_pagamento_avulso_by_id_service_1.GetPagamentoAvulsoByIdService,
        update_pagamento_avulso_service_1.UpdatePagamentoAvulsoService,
        get_all_pagamentos_avulso_service_1.GetAllPagamentosAvulsoService,
        create_log_service_1.CreateLogService])
], PagamentoAvulsoController);

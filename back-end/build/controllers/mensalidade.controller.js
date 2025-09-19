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
exports.MensalidadeController = void 0;
const typedi_1 = require("typedi");
const create_mensalida_service_1 = require("../services/mensalidade/create-mensalida.service");
const delete_mensalidade_service_1 = require("../services/mensalidade/delete-mensalidade.service");
const get_all_mensalidades_service_1 = require("../services/mensalidade/get-all-mensalidades.service");
const get_mensalidade_by_cliente_id_service_1 = require("../services/mensalidade/get-mensalidade-by-cliente-id.service");
const get_mensalidade_by_id_service_1 = require("../services/mensalidade/get-mensalidade-by-id.service");
const pay_mensalidade_service_1 = require("../services/mensalidade/pay-mensalidade.service");
const safeTypes_1 = require("../utils/safeTypes");
const cancel_mensalidade_service_1 = require("../services/mensalidade/cancel-mensalidade.service");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
const date_range_1 = require("../utils/date-range");
const find_all_mensalidade_pendente_by_cliente_id_service_1 = require("../services/mensalidade/find-all-mensalidade-pendente-by-cliente-id.service");
let MensalidadeController = class MensalidadeController {
    constructor(createMensalidadeService, getMensalidadeByIdService, getMensalidadeByClienteIdService, deleteMensalidadeService, payMensalidadeService, getAllMensalidadesService, cancelMensalidadeService, findAllMensalidadePendenteByClienteIdService, log) {
        this.createMensalidadeService = createMensalidadeService;
        this.getMensalidadeByIdService = getMensalidadeByIdService;
        this.getMensalidadeByClienteIdService = getMensalidadeByClienteIdService;
        this.deleteMensalidadeService = deleteMensalidadeService;
        this.payMensalidadeService = payMensalidadeService;
        this.getAllMensalidadesService = getAllMensalidadesService;
        this.cancelMensalidadeService = cancelMensalidadeService;
        this.findAllMensalidadePendenteByClienteIdService = findAllMensalidadePendenteByClienteIdService;
        this.log = log;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const mensalidade = yield this.createMensalidadeService.execute({
                    clienteId: Number(req.params.clienteId),
                });
                if (mensalidade) {
                    yield this.log.execute(user.id, `Criou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);
                }
                res.status(201).json(mensalidade);
            }
            catch (error) {
                next(error);
            }
        });
    }
    payMensalidade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { formaPagamento, valorPago } = req.body;
                const mensalidade = yield this.payMensalidadeService.execute({
                    mensalidadeId: Number(req.params.id),
                    formaPagamento,
                    valorPago,
                });
                if (mensalidade) {
                    yield this.log.execute(user.id, `Pagou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);
                }
                res.status(200).json(mensalidade);
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
                const mensalidade = yield this.getMensalidadeByIdService.execute(Number(req.params.id));
                res.status(200).json(mensalidade);
                if (mensalidade) {
                    yield this.log.execute(user.id, `Consultou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByClienteId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const mensalidades = yield this.getMensalidadeByClienteIdService.execute(Number(req.params.clienteId));
                if (mensalidades.length > 0) {
                    yield this.log.execute(user.id, 'Consultou mensalidades', Number(mensalidades[0].clienteId));
                }
                res.status(200).json(mensalidades);
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
                const mensalidade = yield this.deleteMensalidadeService.execute(Number(req.params.id));
                if (mensalidade)
                    yield this.log.execute(user.id, `Deletou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    cancel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const mensalidade = yield this.cancelMensalidadeService.execute(Number(req.params.id));
                if (mensalidade) {
                    yield this.log.execute(user.id, `Cancelou mensalidade do id: ${mensalidade.id}`, mensalidade.clienteId);
                }
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numberPage, limit, clienteId, initialDate, finalDate, status, formaPagamento } = req.query;
                const page = (0, safeTypes_1.safeParseInt)(numberPage) || 1;
                const limitNumber = (0, safeTypes_1.safeParseInt)(limit) || 30;
                const clienteIdQuery = (0, safeTypes_1.safeParseInt)(clienteId);
                const statusQuery = (0, safeTypes_1.safeParseStatusMensalidadeArray)(status);
                const formaPagamentoQuery = (0, safeTypes_1.safeParseFormPagamentoArray)(formaPagamento);
                const { startAtUtc, endAtUtc } = (0, date_range_1.buildUtcRange)(initialDate, finalDate);
                const mensalidades = yield this.getAllMensalidadesService.execute(page, limitNumber, {
                    clienteId: clienteIdQuery,
                    initialDate: startAtUtc,
                    finalDate: endAtUtc,
                    status: statusQuery,
                    formaPagamento: formaPagamentoQuery,
                });
                res.status(200).json(mensalidades);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllPendingByClienteId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clienteId = Number(req.params.clienteId);
                const mensalidades = yield this.findAllMensalidadePendenteByClienteIdService.execute(clienteId);
                res.status(200).json(mensalidades);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.MensalidadeController = MensalidadeController;
exports.MensalidadeController = MensalidadeController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [create_mensalida_service_1.CreateMensalidadeService,
        get_mensalidade_by_id_service_1.GetMensalidadeByIdService,
        get_mensalidade_by_cliente_id_service_1.GetMensalidadeByClienteIdService,
        delete_mensalidade_service_1.DeleteMensalidadeService,
        pay_mensalidade_service_1.PayMensalidadeService,
        get_all_mensalidades_service_1.GetAllMensalidadesService,
        cancel_mensalidade_service_1.CancelMensalidadeService,
        find_all_mensalidade_pendente_by_cliente_id_service_1.FindAllMensalidadePendenteByClienteIdService,
        create_log_service_1.CreateLogService])
], MensalidadeController);

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
exports.ClienteController = void 0;
const typedi_1 = require("typedi");
const active_cliente_service_1 = require("../services/cliente/active-cliente.service");
const create_cliente_service_1 = require("../services/cliente/create-cliente.service");
const disable_cliente_service_1 = require("../services/cliente/disable-cliente.service");
const get_all_clientes_service_1 = require("../services/cliente/get-all-clientes.service");
const get_cliente_by_email_service_1 = require("../services/cliente/get-cliente-by-email.service");
const get_cliente_by_id_service_1 = require("../services/cliente/get-cliente-by-id.service");
const update_cliente_service_1 = require("../services/cliente/update-cliente.service");
const safeTypes_1 = require("../utils/safeTypes");
const get_all_clientes_by_name_service_1 = require("../services/cliente/get-all-clientes-by-name.service");
const get_all_by_birthday_people_month_service_1 = require("../services/cliente/get-all-by-birthday-people-month.service");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
let ClienteController = class ClienteController {
    constructor(createClienteService, getClienteByIdService, getClienteByEmailService, updateClienteService, getAllClientesService, disableClienteService, activeClienteService, getAllClientesByNameService, getAllByBirthdayPeopleMonthService, log) {
        this.createClienteService = createClienteService;
        this.getClienteByIdService = getClienteByIdService;
        this.getClienteByEmailService = getClienteByEmailService;
        this.updateClienteService = updateClienteService;
        this.getAllClientesService = getAllClientesService;
        this.disableClienteService = disableClienteService;
        this.activeClienteService = activeClienteService;
        this.getAllClientesByNameService = getAllClientesByNameService;
        this.getAllByBirthdayPeopleMonthService = getAllByBirthdayPeopleMonthService;
        this.log = log;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cliente = yield this.createClienteService.execute(req.body);
                yield this.log.execute(user.id, 'Criou cliente', cliente.id);
                res.status(201).json(cliente);
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
                const cliente = yield this.getClienteByIdService.execute(Number(req.params.id));
                yield this.log.execute(user.id, 'Buscou cliente por ID', cliente.id);
                res.status(200).json(cliente);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cliente = yield this.getClienteByEmailService.execute(req.params.email);
                yield this.log.execute(user.id, 'Buscou cliente por email', cliente.id);
                res.status(200).json(cliente);
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
                const updatedCliente = yield this.updateClienteService.execute(Number(req.params.id), req.body);
                yield this.log.execute(user.id, 'Atualizou cliente', updatedCliente.id);
                res.status(200).json(updatedCliente);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const name = req.params.name;
                const clientes = yield this.getAllClientesByNameService.execute(name);
                yield this.log.execute(user.id, 'Buscou clientes por nome');
                res.status(200).json(clientes);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numberPage, limit, nome, email, telefone, dataNascimento, diaMensalidade, status, planoId } = req.query;
                const page = (0, safeTypes_1.safeParseInt)(numberPage) || 1;
                const limitNumber = (0, safeTypes_1.safeParseInt)(limit) || 30;
                const nomeQuery = (0, safeTypes_1.safeParseString)(nome);
                const emailQuery = (0, safeTypes_1.safeParseString)(email);
                const telefoneQuery = (0, safeTypes_1.safeParseString)(telefone);
                const dataNascimentoQuery = (0, safeTypes_1.safeParseDate)(dataNascimento);
                const diaMensalidadeQuery = (0, safeTypes_1.safeParseInt)(diaMensalidade);
                const statusQuery = (0, safeTypes_1.safeParseString)(status);
                const planoIdQuery = (0, safeTypes_1.safeParseInt)(planoId);
                const clientes = yield this.getAllClientesService.execute(page, limitNumber, {
                    nome: nomeQuery,
                    email: emailQuery,
                    telefone: telefoneQuery,
                    dataNascimento: dataNascimentoQuery,
                    diaMensalidade: diaMensalidadeQuery,
                    status: statusQuery,
                    planoId: planoIdQuery,
                });
                res.status(200).json(clientes);
            }
            catch (error) {
                next(error);
            }
        });
    }
    disable(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cliente = yield this.disableClienteService.execute(Number(req.params.id));
                yield this.log.execute(user.id, 'Desativou cliente', cliente.id);
                res.status(200).json(cliente);
            }
            catch (error) {
                next(error);
            }
        });
    }
    active(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cliente = yield this.activeClienteService.execute(Number(req.params.id));
                yield this.log.execute(user.id, 'Ativou cliente', cliente.id);
                res.status(200).json(cliente);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllByBirthdayPeopleMonth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield this.getAllByBirthdayPeopleMonthService.execute();
                res.status(200).json(clientes);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.ClienteController = ClienteController;
exports.ClienteController = ClienteController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [create_cliente_service_1.CreateClienteService,
        get_cliente_by_id_service_1.GetClienteByIdService,
        get_cliente_by_email_service_1.GetClienteByEmailService,
        update_cliente_service_1.UpdateClienteService,
        get_all_clientes_service_1.GetAllClientesService,
        disable_cliente_service_1.DisableClienteService,
        active_cliente_service_1.ActiveClienteService,
        get_all_clientes_by_name_service_1.GetAllClientesByNameService,
        get_all_by_birthday_people_month_service_1.GetAllByBirthdayPeopleMonthService,
        create_log_service_1.CreateLogService])
], ClienteController);

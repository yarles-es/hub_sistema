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
exports.ClienteService = void 0;
const typedi_1 = require("typedi");
const cliente_model_1 = require("../../models/cliente.model");
let ClienteService = class ClienteService {
    constructor(clienteModel) {
        this.clienteModel = clienteModel;
    }
    createCliente(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatedData = Object.assign(Object.assign({}, data), { nome: data.nome.trim().toUpperCase(), email: data.email.trim().toLowerCase(), telefone: data.telefone ? data.telefone.trim() : null });
            return this.clienteModel.create(formatedData, transaction);
        });
    }
    getClienteById(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.findById(id, transaction);
        });
    }
    getClienteByEmail(email, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.findByEmail(email, transaction);
        });
    }
    updateCliente(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.update(id, data, transaction);
        });
    }
    deleteCliente(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.delete(id, transaction);
        });
    }
    getAllClientesFiltered(page, limit, filter, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.findAllFiltered(page, limit, filter, transaction);
        });
    }
    countTypeClientes(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.countTypeClientes(transaction);
        });
    }
    findAllClientesByName(name, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.findAllByName(name, transaction);
        });
    }
    getAllClientesWithMensalidadeByPlanId(planoId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.getAllWithMensalidadeByPlanId(planoId, transaction);
        });
    }
    findByIdRegistro(idRegistro, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.findByIdRegistro(idRegistro, transaction);
        });
    }
    findByDataNascimento(dataNascimento, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.findByDataNascimento(dataNascimento, transaction);
        });
    }
    findByBirthdayPeopleMonth(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteModel.findByBirthdayPeopleMonth(transaction);
        });
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [cliente_model_1.ClienteModel])
], ClienteService);

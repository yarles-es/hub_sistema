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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllClientesByNameService = void 0;
const typedi_1 = require("typedi");
const _cliente_service_1 = require("./@cliente.service");
let GetAllClientesByNameService = class GetAllClientesByNameService {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    execute(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || name.trim() === '' || name.length < 3) {
                return [];
            }
            const clientes = yield this.clienteService.findAllClientesByName(name.trim());
            const clientesFormatted = clientes.map((cliente) => {
                const { Mensalidade, plano } = cliente, rest = __rest(cliente, ["Mensalidade", "plano"]);
                const pendente = Mensalidade.find((m) => m.status === 'PENDENTE');
                let status = 'ATIVO';
                if (cliente.ativo === false) {
                    status = 'DESATIVADO';
                }
                else if (pendente) {
                    status = this.isDataNoPassado(pendente.vencimento) ? 'VENCIDO' : 'ATIVO';
                }
                else {
                    status = 'MENSALIDADE_AUSENTE';
                }
                return Object.assign(Object.assign({}, rest), { status, nomePlano: plano.nome, valorPlano: plano.valor });
            });
            return clientesFormatted;
        });
    }
    isDataNoPassado(data) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataComparar = new Date(data);
        dataComparar.setHours(0, 0, 0, 0);
        return dataComparar < hoje;
    }
};
exports.GetAllClientesByNameService = GetAllClientesByNameService;
exports.GetAllClientesByNameService = GetAllClientesByNameService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_cliente_service_1.ClienteService])
], GetAllClientesByNameService);

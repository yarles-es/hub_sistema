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
exports.RegistroAcessoController = void 0;
const typedi_1 = require("typedi");
const get_all_registro_acesso_service_1 = require("../services/registro-acesso/get-all-registro-acesso.service");
const get_all_registro_acesso_for_day_service_1 = require("../services/registro-acesso/get-all-registro-acesso-for-day.service");
const get_all_registros_by_filter_service_1 = require("../services/registro-acesso/get-all-registros-by-filter.service");
const date_range_1 = require("../utils/date-range");
const safeTypes_1 = require("../utils/safeTypes");
let RegistroAcessoController = class RegistroAcessoController {
    constructor(getAllRegistroAcessoService, getAllRegistroAcessoForDayService, getAllRegistrosByFilterService) {
        this.getAllRegistroAcessoService = getAllRegistroAcessoService;
        this.getAllRegistroAcessoForDayService = getAllRegistroAcessoForDayService;
        this.getAllRegistrosByFilterService = getAllRegistrosByFilterService;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registros = yield this.getAllRegistroAcessoService.execute();
                res.status(200).json(registros);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllForDay(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const registros = yield this.getAllRegistroAcessoForDayService.execute(id);
                res.status(200).json(registros);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllByFilter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { initialDate, finalDate, clientId } = req.query;
                const clienteIdQuery = (0, safeTypes_1.safeParseInt)(clientId);
                const { startAtUtc, endAtUtc } = (0, date_range_1.buildUtcRange)(initialDate, finalDate);
                const registros = yield this.getAllRegistrosByFilterService.execute({
                    clienteId: clienteIdQuery,
                    initialDate: startAtUtc,
                    finalDate: endAtUtc,
                });
                res.status(200).json(registros);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.RegistroAcessoController = RegistroAcessoController;
exports.RegistroAcessoController = RegistroAcessoController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [get_all_registro_acesso_service_1.GetAllRegistroAcessoService,
        get_all_registro_acesso_for_day_service_1.GetAllRegistroAcessoForDayService,
        get_all_registros_by_filter_service_1.GetAllRegistrosByFilterService])
], RegistroAcessoController);

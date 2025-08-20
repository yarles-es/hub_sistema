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
exports.PlanoController = void 0;
const typedi_1 = require("typedi");
const create_plano_service_1 = require("../services/plano/create-plano.service");
const delete_plano_service_1 = require("../services/plano/delete-plano.service");
const get_all_planos_service_1 = require("../services/plano/get-all-planos.service");
const get_plano_bi_id_service_1 = require("../services/plano/get-plano-bi-id.service");
const update_plano_service_1 = require("../services/plano/update-plano.service");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
let PlanoController = class PlanoController {
    constructor(getPlanoByIdService, updatePlanoService, deletePlanoService, createPlanoService, getAllPlanosService, log) {
        this.getPlanoByIdService = getPlanoByIdService;
        this.updatePlanoService = updatePlanoService;
        this.deletePlanoService = deletePlanoService;
        this.createPlanoService = createPlanoService;
        this.getAllPlanosService = getAllPlanosService;
        this.log = log;
    }
    createPlano(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const plano = yield this.createPlanoService.execute(req.body);
                yield this.log.execute(user.id, `Criou plano id: ${plano.id}`);
                res.status(201).json(plano);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPlanoById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const plano = yield this.getPlanoByIdService.execute(Number(req.params.id));
                if (plano)
                    yield this.log.execute(user.id, `Consultou plano id: ${plano.id}`);
                res.status(200).json(plano);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updatePlano(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const plano = yield this.updatePlanoService.execute(Number(req.params.id), req.body);
                if (plano)
                    yield this.log.execute(user.id, `Atualizou plano id: ${plano.id}`);
                res.status(200).json(plano);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deletePlano(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const plano = yield this.deletePlanoService.execute(Number(req.params.id));
                if (plano)
                    yield this.log.execute(user.id, `Deletou plano id: ${plano.id}`);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllPlanos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planos = yield this.getAllPlanosService.execute();
                res.status(200).json(planos);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.PlanoController = PlanoController;
exports.PlanoController = PlanoController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [get_plano_bi_id_service_1.GetPlanoByIdService,
        update_plano_service_1.UpdatePlanoService,
        delete_plano_service_1.DeletePlanoService,
        create_plano_service_1.CreatePlanoService,
        get_all_planos_service_1.GetAllPlanosService,
        create_log_service_1.CreateLogService])
], PlanoController);

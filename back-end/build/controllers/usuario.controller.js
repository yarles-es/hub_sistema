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
exports.UsuarioController = void 0;
const typedi_1 = require("typedi");
const create_usuario_service_1 = require("../services/usuario/create-usuario.service");
const disable_usuario_service_1 = require("../services/usuario/disable-usuario.service");
const get_all_usuario_service_1 = require("../services/usuario/get-all-usuario.service");
const get_usuario_by_email_service_1 = require("../services/usuario/get-usuario-by-email.service");
const get_usuario_by_id_service_1 = require("../services/usuario/get-usuario-by-id.service");
const update_usuario_service_1 = require("../services/usuario/update-usuario.service");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
let UsuarioController = class UsuarioController {
    constructor(createUsuarioService, getUsuarioByIdService, getUsuarioByEmailService, updateUsuarioService, editStatusUsuarioService, getAllUsuarioService, log) {
        this.createUsuarioService = createUsuarioService;
        this.getUsuarioByIdService = getUsuarioByIdService;
        this.getUsuarioByEmailService = getUsuarioByEmailService;
        this.updateUsuarioService = updateUsuarioService;
        this.editStatusUsuarioService = editStatusUsuarioService;
        this.getAllUsuarioService = getAllUsuarioService;
        this.log = log;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const usuario = yield this.createUsuarioService.execute(req.body);
                yield this.log.execute(user.id, `Criou usuário id: ${usuario.id}`);
                res.status(201).json(usuario);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.getAllUsuarioService.execute();
                res.status(200).json(usuarios);
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
                const usuario = yield this.getUsuarioByIdService.execute(Number(req.params.id));
                yield this.log.execute(user.id, `Consultou usuário id: ${usuario.id}`);
                res.status(200).json(usuario);
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
                const usuario = yield this.getUsuarioByEmailService.execute(req.params.email);
                yield this.log.execute(user.id, `Consultou usuário email: ${req.params.email}`);
                res.status(200).json(usuario);
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
                const updatedUsuario = yield this.updateUsuarioService.execute(Number(req.params.id), req.body);
                yield this.log.execute(user.id, `Atualizou usuário id: ${updatedUsuario.id}`);
                res.status(200).json(updatedUsuario);
            }
            catch (error) {
                next(error);
            }
        });
    }
    editStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield this.editStatusUsuarioService.execute(Number(req.params.id), req.body.status);
                yield this.log.execute(user.id, `Atualizou status do usuário id: ${req.params.id}`);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.UsuarioController = UsuarioController;
exports.UsuarioController = UsuarioController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [create_usuario_service_1.CreateUsuarioService,
        get_usuario_by_id_service_1.GetUsuarioByIdService,
        get_usuario_by_email_service_1.GetUsuarioByEmailService,
        update_usuario_service_1.UpdateUsuarioService,
        disable_usuario_service_1.EditStatusUsuarioService,
        get_all_usuario_service_1.GetAllUsuarioService,
        create_log_service_1.CreateLogService])
], UsuarioController);

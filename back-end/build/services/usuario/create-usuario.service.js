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
exports.CreateUsuarioService = void 0;
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const validate_email_1 = require("../../utils/validate-email");
const _usuario_service_1 = require("./@usuario.service");
let CreateUsuarioService = class CreateUsuarioService {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    execute(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._validate(usuario);
            return yield this.usuarioService.create(usuario);
        });
    }
    _validate(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            if (usuario.email.length < 5 || !(0, validate_email_1.validateEmail)(usuario.email)) {
                throw new BadRequestError_1.BadRequestError('Email inválido');
            }
            const userExists = yield this.usuarioService.findByEmail(usuario.email);
            if (userExists) {
                throw new BadRequestError_1.BadRequestError('Email já cadastrado');
            }
            if (!usuario.nome || !usuario.email || !usuario.senha) {
                throw new BadRequestError_1.BadRequestError('Nome, email e senha são obrigatórios');
            }
            if (usuario.senha.length < 6) {
                throw new BadRequestError_1.BadRequestError('Senha deve ter pelo menos 6 caracteres');
            }
        });
    }
};
exports.CreateUsuarioService = CreateUsuarioService;
exports.CreateUsuarioService = CreateUsuarioService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_usuario_service_1.UsuarioService])
], CreateUsuarioService);

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
exports.UpdateUsuarioService = void 0;
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../../errors/BadRequestError");
const NotFoundError_1 = require("../../errors/NotFoundError");
const validate_email_1 = require("../../utils/validate-email");
const _usuario_service_1 = require("./@usuario.service");
let UpdateUsuarioService = class UpdateUsuarioService {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    execute(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || isNaN(id) || id <= 0)
                throw new BadRequestError_1.BadRequestError('ID inválido.');
            yield this.validate(usuario);
            const existingUser = yield this.usuarioService.findById(id);
            if (!existingUser)
                throw new NotFoundError_1.NotFoundError('Usuário não encontrado.');
            return yield this.usuarioService.update(id, usuario);
        });
    }
    validate(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (((_a = usuario.email) === null || _a === void 0 ? void 0 : _a.trim()) !== '' && !(0, validate_email_1.validateEmail)(usuario.email || '')) {
                throw new BadRequestError_1.BadRequestError('Email inválido.');
            }
            if (((_b = usuario.nome) === null || _b === void 0 ? void 0 : _b.trim()) === '') {
                throw new BadRequestError_1.BadRequestError('Nome não pode ser vazio.');
            }
            if (usuario.senha === '' || ((_c = usuario.senha) === null || _c === void 0 ? void 0 : _c.trim()) === '') {
                throw new BadRequestError_1.BadRequestError('Senha não pode ser vazia.');
            }
            if (usuario.senha !== undefined && usuario.senha.length < 6)
                throw new BadRequestError_1.BadRequestError('Senha deve ter pelo menos 6 caracteres.');
            if (usuario.ativo && typeof usuario.ativo !== 'boolean') {
                throw new BadRequestError_1.BadRequestError('O campo "ativo" deve ser um booleano.');
            }
            if (usuario.administrador && typeof usuario.administrador !== 'boolean') {
                throw new BadRequestError_1.BadRequestError('O campo "administrador" deve ser um booleano.');
            }
        });
    }
};
exports.UpdateUsuarioService = UpdateUsuarioService;
exports.UpdateUsuarioService = UpdateUsuarioService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_usuario_service_1.UsuarioService])
], UpdateUsuarioService);

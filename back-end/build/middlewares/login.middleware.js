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
exports.LoginMiddleware = void 0;
const typedi_1 = require("typedi");
const BadRequestError_1 = require("../errors/BadRequestError");
const _usuario_service_1 = require("../services/usuario/@usuario.service");
const bcrypt_1 = require("../utils/bcrypt");
let LoginMiddleware = class LoginMiddleware {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    execute(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, senha } = this.validate(req);
                const user = yield this.usuarioService.findByEmailWithPassword(login.toLowerCase());
                if (!user || !user.ativo) {
                    throw new BadRequestError_1.BadRequestError('Usuário ou senha inválida');
                }
                if (!(yield (0, bcrypt_1.compareHashBcrypt)(senha, user.senha))) {
                    throw new BadRequestError_1.BadRequestError('Usuário ou senha inválida');
                }
                const { senha: senhaHash, createdAt, updatedAt } = user, userWithoutPassword = __rest(user, ["senha", "createdAt", "updatedAt"]);
                req.body.user = userWithoutPassword;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    validate(req) {
        const { login, senha } = req.body;
        if (!login || !senha) {
            throw new BadRequestError_1.BadRequestError('Login e senha são obrigatórios');
        }
        return { login, senha };
    }
};
exports.LoginMiddleware = LoginMiddleware;
exports.LoginMiddleware = LoginMiddleware = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [_usuario_service_1.UsuarioService])
], LoginMiddleware);

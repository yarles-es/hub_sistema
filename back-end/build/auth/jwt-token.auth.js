"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const typedi_1 = require("typedi");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
let JwtToken = class JwtToken {
    constructor() {
        this.jwtConfig = {
            algorithm: 'HS256',
            expiresIn: '2h',
        };
        this.secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'ACADEMIA_SECRET';
    }
    createTokenUser(userData) {
        const token = jwt.sign({ data: userData }, this.secret, this.jwtConfig);
        return token;
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        }
        catch (error) {
            throw new UnauthorizedError_1.UnauthorizedError('Invalid token');
        }
    }
    decodeToken(token) {
        const result = jwt.decode(token);
        if (!result)
            throw new UnauthorizedError_1.UnauthorizedError('Invalid token');
        return result;
    }
};
exports.JwtToken = JwtToken;
exports.JwtToken = JwtToken = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], JwtToken);

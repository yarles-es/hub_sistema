"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = validateJWT;
const typedi_1 = __importDefault(require("typedi"));
const jwt_token_auth_1 = require("../auth/jwt-token.auth");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const jwt = typedi_1.default.get((jwt_token_auth_1.JwtToken));
function validateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    const token = authHeader.split(' ')[1];
    const user = jwt.verifyToken(token).data;
    if (!user) {
        throw new UnauthorizedError_1.UnauthorizedError('Token inválido ou expirado');
    }
    req.user = user;
    next();
}

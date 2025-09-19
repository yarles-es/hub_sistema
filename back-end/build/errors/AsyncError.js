"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncError = void 0;
class AsyncError {
    errorHandling(error, _req, res, _next) {
        console.log(error);
        // Se o erro for uma instância de customError, use o statusCode e a mensagem definida
        const statusCode = error.customError ? error.statusCode : 500;
        const message = error.customError ? error.message : 'Internal Server Error';
        return res.status(statusCode).json({ error: message, statusCode, type: error.type });
    }
}
exports.AsyncError = AsyncError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, type) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.isOperational = true;
        this.customError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;

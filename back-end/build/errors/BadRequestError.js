"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const AppError_1 = require("./AppError");
class BadRequestError extends AppError_1.AppError {
    constructor(message = "Invalid request") {
        super(message, 400, "BadRequestError");
    }
}
exports.BadRequestError = BadRequestError;

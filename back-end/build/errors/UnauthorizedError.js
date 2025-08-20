"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const AppError_1 = require("./AppError");
class UnauthorizedError extends AppError_1.AppError {
    constructor(message = "Not authorized") {
        super(message, 401, "UnauthorizedError");
    }
}
exports.UnauthorizedError = UnauthorizedError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = void 0;
const AppError_1 = require("./AppError");
class UnprocessableEntityError extends AppError_1.AppError {
    constructor(message = "Non-processable entity") {
        super(message, 422, "UnprocessableEntityError");
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;

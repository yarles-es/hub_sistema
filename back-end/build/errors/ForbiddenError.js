"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const AppError_1 = require("./AppError");
class ForbiddenError extends AppError_1.AppError {
    constructor(message = "Not allowed") {
        super(message, 403, "ForbiddenError");
    }
}
exports.ForbiddenError = ForbiddenError;

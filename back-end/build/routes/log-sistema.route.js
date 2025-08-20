"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSistemaRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const log_sistema_controller_1 = require("../controllers/log-sistema.controller");
const router = (0, express_1.Router)();
const logSistemaController = typedi_1.default.get(log_sistema_controller_1.LogSistemaController);
router.get('/get-all', logSistemaController.getLogs.bind(logSistemaController));
exports.logSistemaRoute = router;

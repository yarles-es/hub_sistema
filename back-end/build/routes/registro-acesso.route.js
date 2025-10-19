"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registroAcessoRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const registro_acesso_controller_1 = require("../controllers/registro-acesso.controller");
const router = (0, express_1.Router)();
const registroAcessoController = typedi_1.default.get(registro_acesso_controller_1.RegistroAcessoController);
router.get('/acessos-por-filtro', registroAcessoController.getAllByFilter.bind(registroAcessoController));
router.get('/acessos-por-dia/:id', registroAcessoController.getAllForDay.bind(registroAcessoController));
exports.registroAcessoRoute = router;

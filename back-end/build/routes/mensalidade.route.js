"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensalidadeRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const mensalidade_controller_1 = require("../controllers/mensalidade.controller");
const router = (0, express_1.Router)();
const mensalidadeController = typedi_1.default.get(mensalidade_controller_1.MensalidadeController);
router
    .get('/get-by-id/:id', mensalidadeController.getById.bind(mensalidadeController))
    .get('/get-by-cliente/:clienteId', mensalidadeController.getByClienteId.bind(mensalidadeController))
    .post('/create/:clienteId', mensalidadeController.create.bind(mensalidadeController))
    .put('/pay/:id', mensalidadeController.payMensalidade.bind(mensalidadeController))
    .delete('/delete/:id', mensalidadeController.delete.bind(mensalidadeController))
    .get('/get-all', mensalidadeController.getAll.bind(mensalidadeController))
    .put('/cancel/:id', mensalidadeController.cancel.bind(mensalidadeController));
exports.mensalidadeRoute = router;

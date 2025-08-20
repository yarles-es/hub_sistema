"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
const usuarioController = typedi_1.default.get(usuario_controller_1.UsuarioController);
router
    .get('/get-by-id/:id', usuarioController.getById.bind(usuarioController))
    .get('/get-by-email/:email', usuarioController.getByEmail.bind(usuarioController))
    .get('/get-all', usuarioController.getAll.bind(usuarioController))
    .post('/create', usuarioController.create.bind(usuarioController))
    .put('/update/:id', usuarioController.update.bind(usuarioController))
    .put('/edit-status/:id', usuarioController.editStatus.bind(usuarioController));
exports.usuarioRoute = router;

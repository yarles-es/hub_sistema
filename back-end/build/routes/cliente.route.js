"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const cliente_controller_1 = require("../controllers/cliente.controller");
const router = (0, express_1.Router)();
const clienteController = typedi_1.default.get(cliente_controller_1.ClienteController);
router
    .get('/get-by-email/:email', clienteController.getByEmail.bind(clienteController))
    .get('/get-by-id/:id', clienteController.getById.bind(clienteController))
    .post('/create', clienteController.create.bind(clienteController))
    .put('/update/:id', clienteController.update.bind(clienteController))
    .get('/get-all', clienteController.getAll.bind(clienteController))
    .put('/disable/:id', clienteController.disable.bind(clienteController))
    .put('/active/:id', clienteController.active.bind(clienteController))
    .get('/get-by-name/:name', clienteController.getByName.bind(clienteController))
    .get('/get-all-by-birthday-people-month', clienteController.getAllByBirthdayPeopleMonth.bind(clienteController));
exports.clienteRoute = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const login_controller_1 = require("../controllers/login.controller");
const router = (0, express_1.Router)();
const loginController = typedi_1.default.get(login_controller_1.LoginController);
router.post('/', loginController.login.bind(loginController));
exports.loginRoute = router;

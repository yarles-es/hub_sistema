"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastroBiometriaModel = void 0;
const client_1 = require("@prisma/client");
const typedi_1 = require("typedi");
let CadastroBiometriaModel = class CadastroBiometriaModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = transaction || this.prisma;
            return prisma.cadastroBiometria.create({
                data: {
                    clienteId: data.clienteId,
                    idCatraca: data.idCatraca,
                },
            });
        });
    }
    findFirst(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = transaction || this.prisma;
            return prisma.cadastroBiometria.findFirst({
                include: {
                    Cliente: {
                        select: {
                            nome: true,
                        },
                    },
                },
            });
        });
    }
    update(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = transaction || this.prisma;
            yield prisma.cadastroBiometria.update({
                where: { id },
                data,
            });
        });
    }
    delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = transaction || this.prisma;
            yield prisma.cadastroBiometria.delete({
                where: { id },
            });
        });
    }
};
exports.CadastroBiometriaModel = CadastroBiometriaModel;
exports.CadastroBiometriaModel = CadastroBiometriaModel = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], CadastroBiometriaModel);

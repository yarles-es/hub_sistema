"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultBodyCatracaInfo = void 0;
const typedi_1 = __importDefault(require("typedi"));
const _catraca_info_service_1 = require("../../services/catraca/@catraca-info.service");
const service = typedi_1.default.get(_catraca_info_service_1.CatracaInfoService);
const getDefaultBodyCatracaInfo = (network) => __awaiter(void 0, void 0, void 0, function* () {
    const catracaInfo = yield service.getCatracaInfo();
    if (!catracaInfo) {
        throw new Error('Informação da catraca não encontrada');
    }
    const response = {
        id: catracaInfo.id,
        ip: catracaInfo.ip,
        port: catracaInfo.porta,
        type: catracaInfo.tipo,
    };
    if (network) {
        response.network = catracaInfo.networkName;
    }
    return response;
});
exports.getDefaultBodyCatracaInfo = getDefaultBodyCatracaInfo;

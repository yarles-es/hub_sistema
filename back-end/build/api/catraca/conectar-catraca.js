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
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectarCatraca = void 0;
const getDefaultBodyCatracaInfo_1 = require("../params/getDefaultBodyCatracaInfo");
const _api_1 = require("../@api");
const conectarCatraca = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = yield (0, getDefaultBodyCatracaInfo_1.getDefaultBodyCatracaInfo)(true);
    yield (0, _api_1.defaultApiDeviceConnection)({
        type: 'post',
        url: '/Connect',
        body: {},
        params: {
            ip: params.ip,
            type: params.type,
            network: params.network,
        },
    });
});
exports.conectarCatraca = conectarCatraca;

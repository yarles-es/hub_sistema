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
exports.setarTipoFluxoBiometriaCatraca = void 0;
const _api_1 = require("../@api");
const getDefaultBodyCatracaInfo_1 = require("../params/getDefaultBodyCatracaInfo");
const setarTipoFluxoBiometriaCatraca = (mode) => __awaiter(void 0, void 0, void 0, function* () {
    const DEFAULT_BODY = yield (0, getDefaultBodyCatracaInfo_1.getDefaultBodyCatracaInfo)();
    yield (0, _api_1.defaultApiLiteNet2Commands)({
        type: 'post',
        url: '/SetFingerprintIdentificationMode',
        body: Object.assign({}, DEFAULT_BODY),
        params: { mode },
    });
});
exports.setarTipoFluxoBiometriaCatraca = setarTipoFluxoBiometriaCatraca;

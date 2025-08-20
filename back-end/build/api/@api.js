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
exports.defaultApiWebhook = exports.defaultApiSM25Reader = exports.defaultApiLiteNet2Commands = exports.defaultApiDeviceConnection = exports.partyUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const conectar_catraca_1 = require("./catraca/conectar-catraca");
const url = process.env.CATRACA_BASE_URL;
if (!url) {
    throw new Error('CATRACA_BASE_URL is not defined');
}
exports.partyUrl = {
    liteNet: 'LiteNet2Commands', // rota de trabalho do LiteNet2
    deviceConection: 'DeviceConnection', // rota de trabalho das conexões
    sm25Reader: 'SM25ReaderCommands', // rota de trabalho do leitor SM25
    webhook: 'Webhook', // rota de trabalho do webhook
};
const api = axios_1.default.create({
    baseURL: url,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});
const defaultApiDeviceConnection = ({ type, url, body, params }) => {
    const fullUrl = `${exports.partyUrl.deviceConection}${url}`;
    if (type === 'get' || type === 'delete') {
        return api[type](fullUrl, { params });
    }
    return api[type](fullUrl, body, { params });
};
exports.defaultApiDeviceConnection = defaultApiDeviceConnection;
const defaultApiLiteNet2Commands = (_a) => __awaiter(void 0, [_a], void 0, function* ({ type, url, body, params, reconnect = true, }) {
    var _b, _c, _d;
    try {
        const fullUrl = `${exports.partyUrl.liteNet}${url}`;
        if (type === 'get' || type === 'delete') {
            return yield api[type](fullUrl, { params });
        }
        return yield api[type](fullUrl, body, { params });
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && reconnect) {
            const status = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status;
            const responseData = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data;
            const mensagemErro = ((_d = responseData === null || responseData === void 0 ? void 0 : responseData.response) === null || _d === void 0 ? void 0 : _d.message) || '';
            const erroDeDesconexao = status === 400 &&
                typeof mensagemErro === 'string' &&
                mensagemErro.includes('device is not in connected');
            if (erroDeDesconexao) {
                console.warn('[RECONNECT] Catraca desconectada. Tentando reconectar...');
                yield (0, conectar_catraca_1.conectarCatraca)();
                const retryUrl = `${exports.partyUrl.liteNet}${url}`;
                if (type === 'get' || type === 'delete') {
                    return yield api[type](retryUrl, { params });
                }
                return yield api[type](retryUrl, body, { params });
            }
            console.error('Erro na requisição para catraca (não reconectado):', mensagemErro);
        }
        else {
            console.error('Erro inesperado na requisição:', error);
        }
        throw error;
    }
});
exports.defaultApiLiteNet2Commands = defaultApiLiteNet2Commands;
const defaultApiSM25Reader = (_a) => __awaiter(void 0, [_a], void 0, function* ({ type, url, body, params, reconnect = true, }) {
    var _b, _c, _d;
    try {
        const fullUrl = `${exports.partyUrl.sm25Reader}${url}`;
        if (type === 'get' || type === 'delete') {
            const res = yield api[type](fullUrl, { params });
            return res.data;
        }
        const res = yield api[type](fullUrl, body, { params });
        return res.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && reconnect) {
            const status = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status;
            const responseData = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data;
            const mensagemErro = ((_d = responseData === null || responseData === void 0 ? void 0 : responseData.response) === null || _d === void 0 ? void 0 : _d.message) || '';
            const erroDeDesconexao = status === 400 &&
                typeof mensagemErro === 'string' &&
                mensagemErro.includes('device is not in connected');
            if (erroDeDesconexao) {
                console.warn('[RECONNECT] SM25 desconectado. Tentando reconectar...');
                yield (0, conectar_catraca_1.conectarCatraca)();
                const retryUrl = `${exports.partyUrl.sm25Reader}${url}`;
                if (type === 'get' || type === 'delete') {
                    const res = yield api[type](retryUrl, { params });
                    return res.data;
                }
                const res = yield api[type](retryUrl, body, { params });
                return res.data;
            }
            console.error('Erro na requisição para SM25 (não reconectado):', mensagemErro);
        }
        else {
            console.error('Erro inesperado na requisição:', error);
        }
        throw error;
    }
});
exports.defaultApiSM25Reader = defaultApiSM25Reader;
const defaultApiWebhook = ({ type, url, body, params }) => {
    const fullUrl = `${exports.partyUrl.webhook}${url}`;
    if (type === 'get' || type === 'delete') {
        return api[type](fullUrl, { params });
    }
    return api[type](fullUrl, body, { params });
};
exports.defaultApiWebhook = defaultApiWebhook;

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
exports.registrarWebhookCatraca = void 0;
const _api_1 = require("../@api");
const registrarWebhookCatraca = () => __awaiter(void 0, void 0, void 0, function* () {
    const CATRACA_WEBHOOK_URL = process.env.CATRACA_WEBHOOK_URL;
    if (!CATRACA_WEBHOOK_URL)
        throw new Error('CATRACA_WEBHOOK_URL is not defined');
    const endpoint = CATRACA_WEBHOOK_URL;
    yield (0, _api_1.defaultApiWebhook)({
        type: 'post',
        url: '/SetEndpoint',
        body: {},
        params: {
            endpoint,
        },
    });
});
exports.registrarWebhookCatraca = registrarWebhookCatraca;

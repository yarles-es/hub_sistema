"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const AsyncError_1 = require("./errors/AsyncError");
const _routes_1 = require("./routes/@routes");
const asyncError = new AsyncError_1.AsyncError();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use((0, cors_1.default)({
    origin: '*',
    exposedHeaders: ['Content-Disposition', 'Content-Type', 'Content-Length', 'authorization'],
}));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(express_1.default.json({ limit: '50mb' }));
app.use('/api', _routes_1.routes);
app.use((err, req, res, next) => {
    asyncError.errorHandling(err, req, res, next);
});
// // faz a primeira conexão com a catraca na inicialização
// conectarCatraca()
//   .then(() => {
//     console.log('Catraca connected successfully');
//   })
//   .catch((err) => {
//     if (err.status === 400) {
//       console.log('catraca já conectada!');
//     } else {
//       console.error('Erro ao conectar a catraca:', err);
//     }
//   });
// // faz registro do webhook na inicialização
// registrarWebhookCatraca()
//   .then(() => {
//     console.log('Webhook registered successfully');
//   })
//   .catch((err) => {
//     console.error('erro:', err);
//   });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

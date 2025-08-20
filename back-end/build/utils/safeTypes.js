"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseString = exports.safeParseStatusMensalidadeArray = exports.safeParseFormPagamentoArray = exports.safeParseDate = exports.safeParseInt = void 0;
const client_1 = require("@prisma/client");
const safeParseInt = (value) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
};
exports.safeParseInt = safeParseInt;
const safeParseDate = (value) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
};
exports.safeParseDate = safeParseDate;
const safeParseFormPagamentoArray = (value) => {
    if (Array.isArray(value)) {
        return value.filter((status) => Object.values(client_1.FormPagamento).includes(status));
    }
    else if (typeof value === 'string') {
        return Object.values(client_1.FormPagamento).includes(value) ? [value] : [];
    }
    return [];
};
exports.safeParseFormPagamentoArray = safeParseFormPagamentoArray;
const safeParseStatusMensalidadeArray = (value) => {
    if (Array.isArray(value)) {
        return value.filter((status) => Object.values(client_1.StatusMensalidade).includes(status));
    }
    else if (typeof value === 'string') {
        return Object.values(client_1.StatusMensalidade).includes(value)
            ? [value]
            : [];
    }
    return [];
};
exports.safeParseStatusMensalidadeArray = safeParseStatusMensalidadeArray;
const safeParseString = (value) => {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
};
exports.safeParseString = safeParseString;

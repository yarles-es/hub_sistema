"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatadorCliente = void 0;
const isDataNoPassado = (data) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataComparar = new Date(data);
    dataComparar.setHours(0, 0, 0, 0);
    return dataComparar < hoje;
};
const formatadorCliente = (clientes) => {
    const clientesFormatted = clientes.map((cliente) => {
        const { Mensalidade, plano } = cliente, rest = __rest(cliente, ["Mensalidade", "plano"]);
        const pendente = Mensalidade.find((m) => m.status === 'PENDENTE');
        let status = 'ATIVO';
        if (cliente.isento) {
            status = 'ISENTO';
        }
        else if (cliente.ativo === false) {
            status = 'DESATIVADO';
        }
        else if (pendente) {
            status = isDataNoPassado(pendente.vencimento) ? 'VENCIDO' : 'ATIVO';
        }
        else {
            status = 'MENSALIDADE_AUSENTE';
        }
        return Object.assign(Object.assign({}, rest), { status, nomePlano: plano.nome, valorPlano: plano.valor });
    });
    return clientesFormatted;
};
exports.formatadorCliente = formatadorCliente;

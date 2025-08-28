"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMensalidadeStatus = editMensalidadeStatus;
const client_1 = require("@prisma/client");
function editMensalidadeStatus(mensalidade) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const vencimentoDate = new Date(mensalidade.vencimento);
    vencimentoDate.setHours(0, 0, 0, 0);
    if (vencimentoDate < currentDate && mensalidade.status !== 'PAGO' && mensalidade.status !== 'CANCELADO') {
        return Object.assign(Object.assign({}, mensalidade), { status: client_1.StatusMensalidade.ATRASADO });
    }
    return mensalidade;
}

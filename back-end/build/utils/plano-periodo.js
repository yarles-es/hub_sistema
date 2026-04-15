"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_DIAS_VALIDOS_SEMANA = void 0;
exports.obterIntervaloSemanaAtual = obterIntervaloSemanaAtual;
exports.isDomingo = isDomingo;
exports.MAX_DIAS_VALIDOS_SEMANA = 6;
function obterIntervaloSemanaAtual(dataReferencia = new Date()) {
    const inicioSemana = new Date(dataReferencia);
    const diaDaSemana = inicioSemana.getDay();
    inicioSemana.setDate(inicioSemana.getDate() - diaDaSemana);
    inicioSemana.setHours(0, 0, 0, 0);
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(fimSemana.getDate() + 6);
    fimSemana.setHours(23, 59, 59, 999);
    return { inicioSemana, fimSemana };
}
function isDomingo(dataReferencia = new Date()) {
    return dataReferencia.getDay() === 0;
}

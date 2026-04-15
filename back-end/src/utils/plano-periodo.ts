export const MAX_DIAS_VALIDOS_SEMANA = 6;

export function obterIntervaloSemanaAtual(dataReferencia: Date = new Date()) {
  const inicioSemana = new Date(dataReferencia);
  const diaDaSemana = inicioSemana.getDay();

  inicioSemana.setDate(inicioSemana.getDate() - diaDaSemana);
  inicioSemana.setHours(0, 0, 0, 0);

  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(fimSemana.getDate() + 6);
  fimSemana.setHours(23, 59, 59, 999);

  return { inicioSemana, fimSemana };
}

export function isDomingo(dataReferencia: Date = new Date()) {
  return dataReferencia.getDay() === 0;
}

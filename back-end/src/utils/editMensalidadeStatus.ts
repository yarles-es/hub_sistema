import { StatusMensalidade } from '@prisma/client';
import { MensalidadeResponseGetAll } from '../types/mensalidade.types';

export function editMensalidadeStatus(
  mensalidade: MensalidadeResponseGetAll['data'][number],
): MensalidadeResponseGetAll['data'][number] {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const vencimentoDate = new Date(mensalidade.vencimento);
  vencimentoDate.setHours(0, 0, 0, 0);

  if (vencimentoDate < currentDate && mensalidade.status !== 'PAGO' && mensalidade.status !== 'CANCELADO') {
    return {
      ...mensalidade,
      status: StatusMensalidade.ATRASADO,
    };
  }
  return mensalidade;
}

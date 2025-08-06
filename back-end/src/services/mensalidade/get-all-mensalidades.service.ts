import { Prisma, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { MensalidadeFilter, MensalidadeResponseGetAll } from '../../types/mensalidade.types';
import { MensalidadeService } from './@mensalidade.service';

@Service()
export class GetAllMensalidadesService {
  constructor(private mensalidadeService: MensalidadeService) {}

  public async execute(
    page: number,
    limit: number,
    filter?: MensalidadeFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<MensalidadeResponseGetAll> {
    const mensalidades = await this.mensalidadeService.findAllMensalidades(page, limit, filter, transaction);

    const mensalidadesEdited = mensalidades.data.map(this.editMensalidadeStatus);

    return {
      ...mensalidades,
      data: mensalidadesEdited,
    };
  }

  private editMensalidadeStatus(
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
}

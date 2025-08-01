import { StatusMensalidade } from '@prisma/client';
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
  ): Promise<MensalidadeResponseGetAll> {
    const mensalidades = await this.mensalidadeService.findAllMensalidades(page, limit, filter);

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
    if (mensalidade.vencimento < currentDate && mensalidade.status !== 'PAGO') {
      return {
        ...mensalidade,
        status: StatusMensalidade.ATRASADO,
      };
    }
    return mensalidade;
  }
}

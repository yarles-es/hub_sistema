import { Prisma, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { MensalidadeFilter, MensalidadeResponseGetAll } from '../../types/mensalidade.types';
import { MensalidadeService } from './@mensalidade.service';
import { editMensalidadeStatus } from '../../utils/editMensalidadeStatus';

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

    const mensalidadesEdited = mensalidades.data.map(editMensalidadeStatus);

    return {
      ...mensalidades,
      data: mensalidadesEdited,
    };
  }
}

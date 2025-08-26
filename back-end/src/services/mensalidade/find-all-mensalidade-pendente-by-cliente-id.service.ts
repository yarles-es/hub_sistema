import { Service } from 'typedi';
import { MensalidadeService } from './@mensalidade.service';
import { MensalidadeResponseGetAll } from '../../types/mensalidade.types';
import { BadRequestError } from '../../errors/BadRequestError';
import { editMensalidadeStatus } from '../../utils/editMensalidadeStatus';

@Service()
export class FindAllMensalidadePendenteByClienteIdService {
  constructor(private mensalidadeService: MensalidadeService) {}

  public async execute(clienteId: number): Promise<MensalidadeResponseGetAll['data']> {
    if (!clienteId || isNaN(clienteId)) {
      throw new BadRequestError('ID do cliente inválido fornecido para busca das mensalidades pendentes.');
    }

    const result = await this.mensalidadeService.findAllPendingMensalidadesByClienteId(clienteId);

    return result.map(editMensalidadeStatus);
  }
}

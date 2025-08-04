import { Service } from 'typedi';
import { MensalidadeService } from './@mensalidade.service';
import { StatusMensalidade } from '@prisma/client';

@Service()
export class CancelMensalidadeService {
  constructor(private mensalidadeService: MensalidadeService) {}

  public async execute(id: number): Promise<void> {
    if (!id || isNaN(id) || id <= 0) {
      throw new Error('ID inválido fornecido para cancelamento da mensalidade.');
    }

    const mensalidade = await this.mensalidadeService.findMensalidadeById(id);
    if (!mensalidade) {
      throw new Error('Mensalidade não encontrada.');
    }

    await this.mensalidadeService.updateMensalidade(id, { status: StatusMensalidade.CANCELADO });
  }
}

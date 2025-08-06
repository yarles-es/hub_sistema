import { Mensalidade, Prisma } from '@prisma/client';
import { Service } from 'typedi';
import { NotFoundError } from '../../errors/NotFoundError';
import { MensalidadeService } from './@mensalidade.service';

@Service()
export class DeleteMensalidadeService {
  constructor(private mensalidadeService: MensalidadeService) {}

  public async execute(id: number, transaction?: Prisma.TransactionClient): Promise<Mensalidade> {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido fornecido para exclusão da mensalidade.');
    }

    const mensalidade = await this.mensalidadeService.findMensalidadeById(id, transaction);

    if (!mensalidade) {
      throw new NotFoundError('Mensalidade não encontrada.');
    }

    return await this.mensalidadeService.deleteMensalidade(id, transaction);
  }
}

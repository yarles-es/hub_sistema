import { Mensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { MensalidadeService } from './@mensalidade.service';

@Service()
export class FindMensalidadeByIdService {
  constructor(private readonly mensalidadeService: MensalidadeService) {}

  public async execute(id: number): Promise<Mensalidade> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido');
    }

    const mensalidade = await this.mensalidadeService.findMensalidadeById(id);

    if (!mensalidade) {
      throw new NotFoundError('Mensalidade não encontrada');
    }

    return mensalidade;
  }
}

import { Plano } from '@prisma/client';
import { Service } from 'typedi';
import { NotFoundError } from '../../errors/NotFoundError';
import { PlanoService } from './@plano.service';

@Service()
export class GetPlanoByIdService {
  constructor(private readonly planoService: PlanoService) {}

  async execute(id: number): Promise<Plano | null> {
    if (!id || id <= 0 || isNaN(id)) {
      throw new NotFoundError('ID inválido');
    }

    const plano = await this.planoService.getPlanoById(id);
    if (!plano) {
      throw new NotFoundError('Plano não encontrado');
    }
    return plano;
  }
}

import { Plano } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { PlanoService } from './@plano.service';

@Service()
export class DeletePlanoService {
  constructor(private readonly planoService: PlanoService) {}

  async execute(id: number): Promise<Plano> {
    if (!id || id <= 0 || isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const plano = await this.planoService.getPlanoById(id);
    if (!plano) {
      throw new BadRequestError('Plano não encontrado');
    }
    return this.planoService.deletePlano(id);
  }
}

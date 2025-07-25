import { Plano } from '@prisma/client';
import { Service } from 'typedi';
import { NotFoundError } from '../../errors/NotFoundError';
import { PlanoService } from './@plano.service';

@Service()
export class GetAllPlanosService {
  constructor(private readonly planoService: PlanoService) {}

  async execute(): Promise<Plano[]> {
    const planos = await this.planoService.getAllPlanos();
    if (!planos || planos.length === 0) {
      throw new NotFoundError('Nenhum plano encontrado');
    }
    return planos;
  }
}

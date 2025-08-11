import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { liberarLivreCatraca } from '../../api/catraca/liberar-livre-catraca';

@Service()
export class LiberarLivreCatracaService {
  async execute() {
    try {
      await liberarLivreCatraca();
    } catch (error) {
      throw new BadRequestError('Erro ao liberar a catraca');
    }
  }
}

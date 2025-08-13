import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { liberarSaidaCatraca } from '../../api/catraca/liberar-saida-catraca';
import { liberarLivreCatraca } from '../../api/catraca/liberar-livre-catraca';

@Service()
export class LiberarSaidaCatracaService {
  async execute() {
    try {
      await liberarLivreCatraca();
    } catch (error) {
      throw new BadRequestError('Erro ao liberar a saída da catraca');
    }
  }
}

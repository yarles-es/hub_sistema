import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { liberarSaidaCatraca } from '../../api/catraca/liberar-saida-catraca';

@Service()
export class LiberarSaidaCatracaService {
  async execute() {
    try {
      await liberarSaidaCatraca();
    } catch (error) {
      throw new BadRequestError('Erro ao liberar a saída da catraca');
    }
  }
}

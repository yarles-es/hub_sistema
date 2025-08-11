import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { liberarEntradaCatraca } from '../../api/catraca/liberar-entrada-catraca';

@Service()
export class LiberarEntradaCatracaService {
  async execute() {
    try {
      await liberarEntradaCatraca();
    } catch (error) {
      throw new BadRequestError('Erro ao liberar a saída da catraca');
    }
  }
}

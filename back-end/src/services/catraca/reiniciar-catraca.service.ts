import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { reiniciarCatraca } from '../../api/catraca/reiniciar-catraca';

@Service()
export class ReiniciarCatracaService {
  async execute() {
    try {
      await reiniciarCatraca();
    } catch (error) {
      throw new BadRequestError('Erro ao reiniciar a catraca');
    }
  }
}

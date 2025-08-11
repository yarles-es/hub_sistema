import { Service } from 'typedi';
import { conectarCatraca } from '../../api/catraca/conectar-catraca';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class ConectarCatracaService {
  async execute() {
    try {
      await conectarCatraca();
    } catch (error) {
      throw new BadRequestError('Erro ao conectar à catraca');
    }
  }
}

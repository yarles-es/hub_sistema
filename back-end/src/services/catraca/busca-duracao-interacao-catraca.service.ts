import { Service } from 'typedi';
import { buscarDuracaoInteracaoCatraca } from '../../api/catraca/buscar-duracao-interacao-catraca';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class BuscaMensagensCatracaService {
  async execute() {
    try {
      const {
        response: {
          data: { content },
        },
      } = await buscarDuracaoInteracaoCatraca();

      return { duration: content };
    } catch (error) {
      throw new BadRequestError('Erro ao buscar duração da interação com a catraca');
    }
  }
}

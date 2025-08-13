import { Service } from 'typedi';
import { buscarDuracaoInteracaoCatraca } from '../../api/catraca/buscar-duracao-interacao-catraca';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class BuscaDuracaoInteracaoCatracaService {
  async execute(): Promise<{ duracao: number }> {
    try {
      const {
        response: {
          data: { content },
        },
      } = await buscarDuracaoInteracaoCatraca();

      return { duracao: content };
    } catch (error) {
      throw new BadRequestError('Erro ao buscar duração da interação com a catraca');
    }
  }
}

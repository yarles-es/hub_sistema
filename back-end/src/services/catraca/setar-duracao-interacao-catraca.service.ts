import { Service } from 'typedi';
import { setarDuracaoInteracaoCatraca } from '../../api/catraca/setar-duracao-interacao-catraca';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class SetarDuracaoInteracaoCatracaService {
  async execute(duracao: number) {
    try {
      const segundos = duracao / 1000;

      if (!Number.isInteger(segundos)) {
        throw new BadRequestError('A duração deve ser um número inteiro.');
      }
      if (segundos > 30) {
        throw new BadRequestError('A duração não pode ser maior que 30 segundos.');
      }

      await setarDuracaoInteracaoCatraca(duracao);
    } catch (error) {
      throw new BadRequestError(`Erro ao definir a duração da interação`);
    }
  }
}

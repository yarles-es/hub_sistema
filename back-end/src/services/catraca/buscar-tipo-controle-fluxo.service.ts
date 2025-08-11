import { Service } from 'typedi';
import { buscarTipoControleFluxoCatraca } from '../../api/catraca/buscar-tipo-controle-fluxo-catraca';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class BuscarTipoControleFluxoService {
  async execute(): Promise<number | null> {
    try {
      const {
        response: {
          data: { content },
        },
      } = await buscarTipoControleFluxoCatraca();

      return content;
    } catch (error) {
      throw new BadRequestError('Falha ao buscar tipo de controle de fluxo da catraca');
    }
  }
}

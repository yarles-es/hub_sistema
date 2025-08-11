import { Service } from 'typedi';
import { setarTipoControleFluxoCatraca } from '../../api/catraca/setar-tipo-controle-fluxo-catraca';
import { BadRequestError } from '../../errors/BadRequestError';

// modo fluxo:
// 0 - nenhum;
// 1 = controla entrada com saida liberada
// 2 = controla saida com entrada liberada
// 3 = controla entrada e saida

@Service()
export class SetarTipoControleFluxoCatracaService {
  public async execute(tipo: number): Promise<void> {
    try {
      if (!tipo || typeof tipo !== 'number') {
        throw new BadRequestError('Tipo de controle de fluxo inválido');
      }

      if (tipo < 0 || tipo > 3) {
        throw new BadRequestError('Tipo de controle de fluxo inválido');
      }

      await setarTipoControleFluxoCatraca(tipo);
    } catch (error) {
      throw new BadRequestError('Erro ao definir o tipo de controle de fluxo da catraca');
    }
  }
}

import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { setarTipoFluxoBiometriaCatraca } from '../../api/catraca/setar-tipo-fluxo-biometria-catraca';

@Service()
export class SetarTipoFluxoBiometriaCatracaService {
  async execute(tipo: number): Promise<void> {
    try {
      if (!tipo || typeof tipo !== 'number') {
        throw new BadRequestError('Tipo de controle de fluxo inválido');
      }

      if (tipo !== 0 && tipo !== 1) {
        throw new BadRequestError('Tipo de controle de fluxo inválido');
      }

      await setarTipoFluxoBiometriaCatraca(tipo);
    } catch (error) {
      throw new BadRequestError('Erro ao setar tipo de fluxo de biometria na catraca');
    }
  }
}

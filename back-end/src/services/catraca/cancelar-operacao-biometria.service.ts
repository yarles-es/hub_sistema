import { Service } from 'typedi';
import { buscarIdDisponivel } from '../../api/biometria/buscar-id-disponivel';
import { BadRequestError } from '../../errors/BadRequestError';
import { cancelarOperacaoBiometria } from '../../api/biometria/cancelar-operacao-biometria';

@Service()
export class CancelarOperacaoBiometriaService {
  public async execute(): Promise<void> {
    try {
      await cancelarOperacaoBiometria();
    } catch (error) {
      throw new BadRequestError('Erro ao cancelar a operação de biometria');
    }
  }
}

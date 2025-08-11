import { Service } from 'typedi';
import { setarSentidoHorarioCatraca } from '../../api/catraca/setar-sentido-horario-catraca';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class SetarSentidoHorarioCatracaService {
  async execute(entryClockwise: boolean) {
    try {
      if (typeof entryClockwise !== 'boolean') {
        throw new BadRequestError('O parâmetro entryClockwise deve ser um booleano');
      }

      await setarSentidoHorarioCatraca(entryClockwise);
    } catch (error) {
      throw new BadRequestError('Erro ao definir o sentido horário da catraca');
    }
  }
}

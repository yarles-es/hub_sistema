import { Service } from 'typedi';
import {
  buscarPrimeiraMensagemCatraca,
  buscarSegundaMensagemCatraca,
} from '../../api/catraca/buscar-mensagens-catraca';
import { BadRequestError } from '../../errors/BadRequestError';
import { MensagensCatracaResponse } from '../../types/catraca.types';

@Service()
export class BuscaMensagensCatracaService {
  public async execute(): Promise<MensagensCatracaResponse> {
    try {
      const {
        response: {
          data: { content: message1 },
        },
      } = await buscarPrimeiraMensagemCatraca();
      const {
        response: {
          data: { content: message2 },
        },
      } = await buscarSegundaMensagemCatraca();

      return {
        message1,
        message2,
      };
    } catch (error) {
      throw new BadRequestError('Erro ao buscar mensagens da catraca');
    }
  }
}

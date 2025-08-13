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
      const result = await buscarPrimeiraMensagemCatraca();
      const result2 = await buscarSegundaMensagemCatraca();

      return {
        primeiraMensagem: result.response.data.content,
        segundaMensagem: result2.response.data.content,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestError('Erro ao buscar mensagens da catraca');
    }
  }
}

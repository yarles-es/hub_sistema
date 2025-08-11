import { Service } from 'typedi';
import { setarPrimeiraMensagemCatraca } from '../../api/catraca/setar-mensagens-catraca';

@Service()
export class SetarPrimeiraMensagemCatracaService {
  async execute(mensagem: string) {
    if (mensagem.length > 16) {
      throw new Error('A mensagem não pode ter mais de 16 caracteres.');
    }

    await setarPrimeiraMensagemCatraca(mensagem);
  }
}

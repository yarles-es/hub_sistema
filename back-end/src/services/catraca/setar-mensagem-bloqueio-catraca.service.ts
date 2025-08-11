import { Service } from 'typedi';
import { setarMensagemBloqueio } from '../../api/catraca/setar-mensagens-catraca';

@Service()
export class SetarMensagemBloqueioCatracaService {
  async execute(mensagem: string) {
    if (mensagem.length > 16) {
      throw new Error('A mensagem não pode ter mais de 16 caracteres.');
    }

    await setarMensagemBloqueio(mensagem);
  }
}

import api, { partyUrl } from './@api';
import { DEFAULT_BODY } from './params/DEFAULT_BODY';

export const BloquearEntradaCatraca = async () => {
  await api.post(
    `${partyUrl.liteNet}/Notify`,
    { ...DEFAULT_BODY },
    {
      params: {
        duration: 3000, // duração da animação do bloqueio em milissegundos
        color: 1, // cor do bloqueio (1 = vermelho)
        showMessage: 1, // id da mensagem a ser exibida
        tone: 2, // tom do bloqueio (2 = tom de erro)
      },
    },
  );
};

import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';
import { defaultApiLiteNet2Commands } from '../@api';

export const notificacaoPositiva = async () => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/Notify',
    body: { ...DEFAULT_BODY },
    params: {
      duration: 3000,
      color: 6,
      showMessage: 1,
      tone: 3,
    },
  });
};

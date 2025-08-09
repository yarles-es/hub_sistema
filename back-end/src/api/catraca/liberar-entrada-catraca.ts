import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';
import { defaultApiLiteNet2Commands } from '../@api';

export const liberarEntradaCatraca = async () => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/ReleaseEntry',
    body: { ...DEFAULT_BODY },
    params: { message: 'Bem Vindo!' },
  });
};

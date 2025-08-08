import { defaultApiLiteNet2Commands } from './@api';
import { getDefaultBodyCatracaInfo } from './params/getDefaultBodyCatracaInfo';

export const liberarSaidaCatraca = async () => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/ReleaseExit',
    body: { ...DEFAULT_BODY },
    params: { message: 'Volte sempre!' },
  });
};

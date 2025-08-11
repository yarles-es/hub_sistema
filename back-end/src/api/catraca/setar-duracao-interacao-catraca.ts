import { defaultApiLiteNet2Commands } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const setarDuracaoInteracaoCatraca = async (releaseDuration: number) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/SetReleaseDuration',
    body: { ...DEFAULT_BODY },
    params: { releaseDuration },
  });
};

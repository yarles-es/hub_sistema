import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';
import { defaultApiLiteNet2Commands } from '../@api';

export const liberarLivreCatraca = async () => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/ReleaseEntryAndExit',
    body: { ...DEFAULT_BODY },
    params: { message: 'Liberada!' },
  });
};

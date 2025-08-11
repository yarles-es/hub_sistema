import { defaultApiLiteNet2Commands } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const setarSentidoHorarioCatraca = async (entryClockwise: boolean) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/SetEntryClockwise',
    body: { ...DEFAULT_BODY },
    params: { entryClockwise },
  });
};

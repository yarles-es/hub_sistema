import { defaultApiLiteNet2Commands } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const setarTipoFluxoBiometriaCatraca = async (mode: number) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/SetFingerprintIdentificationMode​',
    body: { ...DEFAULT_BODY },
    params: { mode },
  });
};

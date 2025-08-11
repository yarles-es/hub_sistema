import { defaultApiLiteNet2Commands } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const setarTipoControleFluxoCatraca = async (controlledFlow: number) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/SetFlowControl',
    body: { ...DEFAULT_BODY },
    params: { controlledFlow },
  });
};

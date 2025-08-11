import { BuscarTipoControleFluxoCatracaResponse } from '../../types/catraca.types';
import { defaultApiLiteNet2Commands } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const buscarTipoControleFluxoCatraca = async () => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const result = await defaultApiLiteNet2Commands<BuscarTipoControleFluxoCatracaResponse>({
    type: 'post',
    url: '/GetReleaseDuration',
    body: { ...DEFAULT_BODY },
  });

  return result;
};

import { CancelarOperacaoResponse } from '../../types/catraca.types';
import { defaultApiSM25Reader } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const limparTemplateBiometriaPorId = async (id: number): Promise<CancelarOperacaoResponse> => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const response = await defaultApiSM25Reader<CancelarOperacaoResponse>({
    type: 'post',
    url: '/ClearTemplate',
    body: DEFAULT_BODY,
    params: { id },
  });

  return response;
};

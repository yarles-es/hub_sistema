import { CancelarOperacaoResponse } from '../../types/catraca.types';
import { defaultApiSM25Reader } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const cancelarOperacaoBiometria = async (): Promise<CancelarOperacaoResponse> => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const response = await defaultApiSM25Reader<CancelarOperacaoResponse>({
    type: 'post',
    url: '/FPCancel',
    body: DEFAULT_BODY,
  });

  return response;
};

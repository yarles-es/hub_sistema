import { BuscarIdDiposnivelResponse } from '../../types/catraca.types';
import { defaultApiSM25Reader } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const buscarIdDisponivel = async (): Promise<BuscarIdDiposnivelResponse> => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const response = await defaultApiSM25Reader<BuscarIdDiposnivelResponse>({
    type: 'post',
    url: '/GetEmptyID',
    body: DEFAULT_BODY,
  });

  return response;
};

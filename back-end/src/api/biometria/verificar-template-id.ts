import { VerificarTemplateIdResponse } from '../../types/catraca.types';
import { defaultApiSM25Reader } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const verificarTemplateId = async (id: number): Promise<VerificarTemplateIdResponse> => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const response = await defaultApiSM25Reader<VerificarTemplateIdResponse>({
    type: 'post',
    url: '/GetTemplateStatus',
    body: DEFAULT_BODY,
    params: { id },
  });

  return response;
};

import { defaultApiSM25Reader } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const iniciarCadastroBiometria = async (id: number) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const response = await defaultApiSM25Reader({
    type: 'post',
    url: '/Enroll',
    body: {
      ...DEFAULT_BODY,
    },
    params: { id },
  });

  return response;
};

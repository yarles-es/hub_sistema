import { BuscarMensagemCatracaResponse } from '../../types/catraca.types';
import { defaultApiLiteNet2Commands } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const buscarPrimeiraMensagemCatraca = async () => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const result = await defaultApiLiteNet2Commands<BuscarMensagemCatracaResponse>({
    type: 'post',
    url: '/GetMessageLine1',
    body: { ...DEFAULT_BODY },
  });
  return result;
};

export const buscarSegundaMensagemCatraca = async () => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  const result = await defaultApiLiteNet2Commands<BuscarMensagemCatracaResponse>({
    type: 'post',
    url: '/GetMessageLine2',
    body: { ...DEFAULT_BODY },
  });
  return result;
};

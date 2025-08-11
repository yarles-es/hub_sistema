import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';
import { defaultApiLiteNet2Commands } from '../@api';

export const setarPrimeiraMensagemCatraca = async (message: string) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/SetMessageLine1',
    body: { ...DEFAULT_BODY },
    params: { message },
  });
};

export const setarSegundaMensagemCatraca = async (message: string) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/SetMessageLine2',
    body: { ...DEFAULT_BODY },
    params: { message },
  });
};

export const setarMensagemBloqueio = async (message: string) => {
  const DEFAULT_BODY = await getDefaultBodyCatracaInfo();
  await defaultApiLiteNet2Commands({
    type: 'post',
    url: '/TempMessage',
    body: { ...DEFAULT_BODY },
    params: { message },
  });
};

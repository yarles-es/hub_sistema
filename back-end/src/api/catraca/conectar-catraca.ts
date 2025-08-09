import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';
import { defaultApiDeviceConnection } from '../@api';

export const conectarCatraca = async () => {
  const params = await getDefaultBodyCatracaInfo(true);
  await defaultApiDeviceConnection({
    type: 'post',
    url: '/Connect',
    body: {},
    params: {
      ip: params.ip,
      type: params.type,
      network: params.network,
    },
  });
};

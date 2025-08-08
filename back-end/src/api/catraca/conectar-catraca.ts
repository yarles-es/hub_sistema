import { defaultApiDeviceConnection } from './@api';
import { getDefaultBodyCatracaInfo } from './params/getDefaultBodyCatracaInfo';

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

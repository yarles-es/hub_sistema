import { defaultApiDeviceConnection } from '../@api';
import { getDefaultBodyCatracaInfo } from '../params/getDefaultBodyCatracaInfo';

export const desconectarCatraca = async () => {
  const params = await getDefaultBodyCatracaInfo(true);
  await defaultApiDeviceConnection({
    type: 'post',
    url: '/Disconnect',
    body: {},
    params: {
      ip: params.ip,
      type: params.type,
      network: params.network,
    },
  });
};

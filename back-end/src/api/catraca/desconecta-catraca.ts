import api, { partyUrl } from './@api';

export const desconectarCatraca = async () => {
  await api.post(
    `${partyUrl.deviceConection}/Disconnect`,
    {},
    {
      params: {
        ip: '192.168.4.37',
        type: 1,
        network: 'eth0',
      },
    },
  );
};

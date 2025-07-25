import api, { partyUrl } from './@api';

export const conectarCatraca = async () => {
  await api.post(
    `${partyUrl.deviceConection}/Connect`,
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

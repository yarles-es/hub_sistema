import api, { partyUrl } from './@api';
import { DEFAULT_BODY } from './params/DEFAULT_BODY';

export const LiberarEntradaCatraca = async () => {
  await api.post(
    `${partyUrl.liteNet}/ReleaseEntry`,
    { ...DEFAULT_BODY },
    {
      params: { message: 'Bem Vindo!' },
    },
  );
};

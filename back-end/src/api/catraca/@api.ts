import axios from 'axios';
import { conectarCatraca } from './conectar-catraca';

const url = 'http://localhost:5110/';

export const partyUrl = {
  liteNet: 'LiteNet2Commands', // rota de trabalho do LiteNet2
  deviceConection: 'DeviceConnection', // rota de trabalho das conexões
};

const api = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type DefaultApi = {
  type: 'post' | 'get' | 'put' | 'delete' | 'patch';
  url: string;
  body?: any;
  params?: any;
  reconnect?: boolean;
};

export const defaultApiDeviceConnection = ({ type, url, body, params }: DefaultApi) => {
  const fullUrl = `${partyUrl.deviceConection}${url}`;

  if (type === 'get' || type === 'delete') {
    return api[type](fullUrl, { params });
  }

  return api[type](fullUrl, body, { params });
};

export const defaultApiLiteNet2Commands = async ({
  type,
  url,
  body,
  params,
  reconnect = true,
}: DefaultApi) => {
  try {
    const fullUrl = `${partyUrl.liteNet}${url}`;

    if (type === 'get' || type === 'delete') {
      return await api[type](fullUrl, { params });
    }

    return await api[type](fullUrl, body, { params });
  } catch (error) {
    if (axios.isAxiosError(error) && reconnect) {
      const status = error.response?.status;
      const responseData = error.response?.data;
      const mensagemErro = responseData?.response?.message || '';

      const erroDeDesconexao =
        status === 400 &&
        typeof mensagemErro === 'string' &&
        mensagemErro.includes('device is not in connected');

      if (erroDeDesconexao) {
        console.warn('[RECONNECT] Catraca desconectada. Tentando reconectar...');
        await conectarCatraca();

        const retryUrl = `${partyUrl.liteNet}${url}`;

        if (type === 'get' || type === 'delete') {
          return await api[type](retryUrl, { params });
        }

        return await api[type](retryUrl, body, { params });
      }

      console.error('Erro na requisição para catraca (não reconectado):', mensagemErro);
    } else {
      console.error('Erro inesperado na requisição:', error);
    }

    throw error;
  }
};

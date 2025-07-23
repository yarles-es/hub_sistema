import axios from 'axios';

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

export default api;

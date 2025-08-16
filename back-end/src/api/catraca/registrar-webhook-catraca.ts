import { defaultApiWebhook } from '../@api';

export const registrarWebhookCatraca = async () => {
  const endpoint = 'http://localhost:3000/api/catraca/webhook';
  await defaultApiWebhook({
    type: 'post',
    url: '/SetEndpoint',
    body: {},
    params: {
      endpoint,
    },
  });
};

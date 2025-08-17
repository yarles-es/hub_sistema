import { defaultApiWebhook } from '../@api';

export const registrarWebhookCatraca = async () => {
  const CATRACA_WEBHOOK_URL = process.env.CATRACA_WEBHOOK_URL;
  if (!CATRACA_WEBHOOK_URL) throw new Error('CATRACA_WEBHOOK_URL is not defined');
  const endpoint = CATRACA_WEBHOOK_URL;
  await defaultApiWebhook({
    type: 'post',
    url: '/SetEndpoint',
    body: {},
    params: {
      endpoint,
    },
  });
};

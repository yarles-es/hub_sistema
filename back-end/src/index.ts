import cors from 'cors';
import 'dotenv/config';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import 'reflect-metadata';
import { AsyncError } from './errors/AsyncError';
import { routes } from './routes/@routes';
import { conectarCatraca } from './api/catraca/conectar-catraca';
import { registrarWebhookCatraca } from './api/catraca/registrar-webhook-catraca';

const asyncError = new AsyncError();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    exposedHeaders: ['Content-Disposition', 'authorization'],
  }),
);

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  asyncError.errorHandling(err, req, res, next);
});

// faz a primeira conexão com a catraca na inicialização
conectarCatraca()
  .then(() => {
    console.log('Catraca connected successfully');
  })
  .catch((err) => {
    console.error('erro:', err.response.data.message);
  });

// faz registro do webhook na inicialização
registrarWebhookCatraca()
  .then(() => {
    console.log('Webhook registered successfully');
  })
  .catch((err) => {
    console.error('erro:', err);
  });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

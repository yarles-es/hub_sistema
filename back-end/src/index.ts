import cors from 'cors';
import 'dotenv/config';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import 'reflect-metadata';
import { AsyncError } from './errors/AsyncError';
import { routes } from './routes/@routes';

const asyncError = new AsyncError();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    exposedHeaders: ['Content-Disposition', 'authorization'],
  }),
);

app.use;

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api', routes);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  asyncError.errorHandling(err, req, res, next);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port ${PORT}`);
});

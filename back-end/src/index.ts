import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import 'reflect-metadata';
import { AsyncError } from './errors/AsyncError';
import { routes } from './routes/@routes';

const asyncError = new AsyncError();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    exposedHeaders: ['Content-Disposition', 'authorization'],
  }),
);

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', routes);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  asyncError.errorHandling(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

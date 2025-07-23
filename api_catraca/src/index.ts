import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import 'reflect-metadata';
import { AsyncError } from './errors/AsyncError';
import router from './routes/catraca.route';

const asyncError = new AsyncError();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/catraca', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  asyncError.errorHandling(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

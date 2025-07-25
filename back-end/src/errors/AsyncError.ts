/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

export class AsyncError {
  public errorHandling(error: any, _req: Request, res: Response, _next: NextFunction) {
    console.log(error);
    // Se o erro for uma instância de customError, use o statusCode e a mensagem que definimos
    const statusCode: number = error.customError ? error.statusCode : 500;
    const message = error.customError ? error.message : 'Internal Server Error';

    return res.status(statusCode).json({ error: message, statusCode, type: error.type });
  }
}

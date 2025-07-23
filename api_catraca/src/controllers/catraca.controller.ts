import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { BloquearEntradaCatraca } from '../api/catraca/bloquear-entrada-catraca';
import { LiberarEntradaCatraca } from '../api/catraca/liberar-entrada-catraca';

@Service()
export class CatracaController {
  public async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('Webhook received:', req.body);

      if ((req.body.response.identification.id as number) === 0) {
        await BloquearEntradaCatraca();
        res.sendStatus(200);
      } else {
        await LiberarEntradaCatraca();
        res.sendStatus(200);
      }
    } catch (error) {
      next(error);
    }
  }
}

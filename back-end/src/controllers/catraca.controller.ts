import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { bloquearEntradaCatraca } from '../api/catraca/bloquear-entrada-catraca';
import { liberarEntradaCatraca } from '../api/catraca/liberar-entrada-catraca';

@Service()
export class CatracaController {
  public async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('Webhook received:', req.body);

      if ((req.body.response.identification.id as number) === 0) {
        await bloquearEntradaCatraca();
        res.sendStatus(200);
      } else {
        await liberarEntradaCatraca();
        res.sendStatus(200);
      }
    } catch (error) {
      next(error);
    }
  }
}

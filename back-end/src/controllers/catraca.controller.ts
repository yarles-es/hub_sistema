import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { Webhook, WebhookCommand774 } from '../types/catraca.types';
import { EntradasaidaCatracaService } from '../services/catraca/entrada-saida-catraca.service';

@Service()
export class CatracaController {
  constructor(private readonly entradasaidaCatracaService: EntradasaidaCatracaService) {}
  public async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req.body);
      const body = req.body as Webhook;
      const { command } = body;

      if (command === 774) {
        await this.entradasaidaCatracaService.execute(req.body as WebhookCommand774);
        res.status(200).send();
      } else {
        res.status(400).send();
      }
    } catch (error) {
      next(error);
    }
  }
}

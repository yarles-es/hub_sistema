import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { GetlogService } from '../services/log-sistema/get-log.service';

@Service()
export class LogSistemaController {
  constructor(private readonly getLogService: GetlogService) {}

  async getLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await this.getLogService.execute();
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
}

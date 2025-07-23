import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { GetlogService } from '../services/log-sistema/get-log.service';

@Service()
export class LogSistemaController {
  constructor(
    private readonly createLogService: CreateLogService,
    private readonly getLogService: GetlogService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { usuarioId, acao, clienteId } = req.body;
      const log = await this.createLogService.execute(usuarioId, acao, clienteId);
      res.status(201).json(log);
    } catch (error) {
      next(error);
    }
  }

  async getLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await this.getLogService.execute();
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { GetlogService } from '../services/log-sistema/get-log.service';
import { safeParseDate, safeParseInt } from '../utils/safeTypes';

@Service()
export class LogSistemaController {
  constructor(private readonly getLogService: GetlogService) {}

  async getLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { numberPage, limit, userId, clientId, initialDate, finalDate } = req.query;

      const page = safeParseInt(numberPage) || 1;
      const limitNumber = safeParseInt(limit) || 30;
      const clienteIdQuery = safeParseInt(clientId);
      const userIdQuery = safeParseInt(userId);
      const initialDateQuery = safeParseDate(initialDate);
      const finalDateQuery = safeParseDate(finalDate);

      const logs = await this.getLogService.execute(page, limitNumber, {
        clienteId: clienteIdQuery,
        userId: userIdQuery,
        initialDate: initialDateQuery,
        finalDate: finalDateQuery,
      });

      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
}

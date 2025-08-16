import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { GetlogService } from '../services/log-sistema/get-log.service';
import { safeParseInt } from '../utils/safeTypes';
import { buildUtcRange } from '../utils/date-range';

@Service()
export class LogSistemaController {
  constructor(private readonly getLogService: GetlogService) {}

  async getLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { numberPage, limit, usuarioId, clienteId, initialDate, finalDate } = req.query;

      const page = safeParseInt(numberPage) || 1;
      const limitNumber = safeParseInt(limit) || 30;
      const clienteIdQuery = safeParseInt(clienteId);
      const usuarioIdQuery = safeParseInt(usuarioId);

      const { startAtUtc, endAtUtc } = buildUtcRange(
        initialDate as string | undefined,
        finalDate as string | undefined,
      );

      const logs = await this.getLogService.execute(page, limitNumber, {
        clienteId: clienteIdQuery,
        usuarioId: usuarioIdQuery,
        initialDate: startAtUtc,
        finalDate: endAtUtc,
      });

      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
}

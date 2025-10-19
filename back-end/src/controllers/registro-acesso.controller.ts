import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { GetAllRegistroAcessoService } from '../services/registro-acesso/get-all-registro-acesso.service';
import { GetAllRegistroAcessoForDayService } from '../services/registro-acesso/get-all-registro-acesso-for-day.service';
import { GetAllRegistrosByFilterService } from '../services/registro-acesso/get-all-registros-by-filter.service';
import { buildUtcRange } from '../utils/date-range';
import { safeParseInt } from '../utils/safeTypes';

@Service()
export class RegistroAcessoController {
  constructor(
    private readonly getAllRegistroAcessoService: GetAllRegistroAcessoService,
    private readonly getAllRegistroAcessoForDayService: GetAllRegistroAcessoForDayService,
    private readonly getAllRegistrosByFilterService: GetAllRegistrosByFilterService,
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registros = await this.getAllRegistroAcessoService.execute();
      res.status(200).json(registros);
    } catch (error) {
      next(error);
    }
  }

  async getAllForDay(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const registros = await this.getAllRegistroAcessoForDayService.execute(id);
      res.status(200).json(registros);
    } catch (error) {
      next(error);
    }
  }

  async getAllByFilter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { initialDate, finalDate, clientId } = req.query;

      const clienteIdQuery = safeParseInt(clientId);
      const { startAtUtc, endAtUtc } = buildUtcRange(
        initialDate as string | undefined,
        finalDate as string | undefined,
      );

      const registros = await this.getAllRegistrosByFilterService.execute({
        clienteId: clienteIdQuery,
        initialDate: startAtUtc,
        finalDate: endAtUtc,
      });

      res.status(200).json(registros);
    } catch (error) {
      next(error);
    }
  }
}

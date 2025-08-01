import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateMensalidadeService } from '../services/mensalidade/create-mensalida.service';
import { DeleteMensalidadeService } from '../services/mensalidade/delete-mensalidade.service';
import { GetAllMensalidadesService } from '../services/mensalidade/get-all-mensalidades.service';
import { GetMensalidadeByClienteIdService } from '../services/mensalidade/get-mensalidade-by-cliente-id.service';
import { GetMensalidadeByIdService } from '../services/mensalidade/get-mensalidade-by-id.service';
import { PayMensalidadeService } from '../services/mensalidade/pay-mensalidade.service';
import {
  safeParseDate,
  safeParseFormPagamentoArray,
  safeParseInt,
  safeParseStatusMensalidadeArray,
} from '../utils/safeTypes';

@Service()
export class MensalidadeController {
  constructor(
    private readonly createMensalidadeService: CreateMensalidadeService,
    private readonly getMensalidadeByIdService: GetMensalidadeByIdService,
    private readonly getMensalidadeByClienteIdService: GetMensalidadeByClienteIdService,
    private readonly deleteMensalidadeService: DeleteMensalidadeService,
    private readonly payMensalidadeService: PayMensalidadeService,
    private readonly getAllMensalidadesService: GetAllMensalidadesService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mensalidade = await this.createMensalidadeService.execute({ clienteId: req.body.clienteId });
      res.status(201).json(mensalidade);
    } catch (error) {
      next(error);
    }
  }

  async payMensalidade(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { formaPagamento } = req.body;
      const mensalidade = await this.payMensalidadeService.execute(Number(req.params.id), formaPagamento);
      res.status(200).json(mensalidade);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mensalidade = await this.getMensalidadeByIdService.execute(Number(req.params.id));
      res.status(200).json(mensalidade);
    } catch (error) {
      next(error);
    }
  }

  async getByClienteId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mensalidades = await this.getMensalidadeByClienteIdService.execute(Number(req.params.clienteId));
      res.status(200).json(mensalidades);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteMensalidadeService.execute(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { numberPage, limit, clienteId, initialDate, finalDate, status, formaPagamento } = req.query;
      const page = safeParseInt(numberPage) || 1;
      const limitNumber = safeParseInt(limit) || 30;
      const clienteIdQuery = safeParseInt(clienteId);
      const initialDateQuery = safeParseDate(initialDate);
      const finalDateQuery = safeParseDate(finalDate);
      const statusQuery = safeParseStatusMensalidadeArray(status);
      const formaPagamentoQuery = safeParseFormPagamentoArray(formaPagamento);

      const mensalidades = await this.getAllMensalidadesService.execute(page, limitNumber, {
        clienteId: clienteIdQuery,
        initialDate: initialDateQuery,
        finalDate: finalDateQuery,
        status: statusQuery,
        formaPagamento: formaPagamentoQuery,
      });

      res.status(200).json(mensalidades);
    } catch (error) {
      next(error);
    }
  }
}

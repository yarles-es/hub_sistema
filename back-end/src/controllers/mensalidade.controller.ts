import { NextFunction, Response } from 'express';
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
import { CancelMensalidadeService } from '../services/mensalidade/cancel-mensalidade.service';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { AuthenticatedRequest } from '../types/Request.types';

@Service()
export class MensalidadeController {
  constructor(
    private readonly createMensalidadeService: CreateMensalidadeService,
    private readonly getMensalidadeByIdService: GetMensalidadeByIdService,
    private readonly getMensalidadeByClienteIdService: GetMensalidadeByClienteIdService,
    private readonly deleteMensalidadeService: DeleteMensalidadeService,
    private readonly payMensalidadeService: PayMensalidadeService,
    private readonly getAllMensalidadesService: GetAllMensalidadesService,
    private readonly cancelMensalidadeService: CancelMensalidadeService,
    private readonly log: CreateLogService,
  ) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const mensalidade = await this.createMensalidadeService.execute({
        clienteId: Number(req.params.clienteId),
      });

      if (mensalidade) {
        await this.log.execute(user.id, `Criou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);
      }

      res.status(201).json(mensalidade);
    } catch (error) {
      next(error);
    }
  }

  async payMensalidade(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const { formaPagamento, valorPago } = req.body;

      const mensalidade = await this.payMensalidadeService.execute({
        mensalidadeId: Number(req.params.id),
        formaPagamento,
        valorPago,
      });

      if (mensalidade) {
        await this.log.execute(user.id, `Pagou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);
      }

      res.status(200).json(mensalidade);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const mensalidade = await this.getMensalidadeByIdService.execute(Number(req.params.id));

      res.status(200).json(mensalidade);

      if (mensalidade) {
        await this.log.execute(user.id, `Consultou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);
      }
    } catch (error) {
      next(error);
    }
  }

  async getByClienteId(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const mensalidades = await this.getMensalidadeByClienteIdService.execute(Number(req.params.clienteId));

      if (mensalidades.length > 0) {
        await this.log.execute(user.id, 'Consultou mensalidades', Number(mensalidades[0].clienteId));
      }

      res.status(200).json(mensalidades);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const mensalidade = await this.deleteMensalidadeService.execute(Number(req.params.id));

      if (mensalidade)
        await this.log.execute(user.id, `Deletou mensalidade id: ${mensalidade.id}`, mensalidade.clienteId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const mensalidade = await this.cancelMensalidadeService.execute(Number(req.params.id));

      if (mensalidade) {
        await this.log.execute(
          user.id,
          `Cancelou mensalidade do id: ${mensalidade.id}`,
          mensalidade.clienteId,
        );
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
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

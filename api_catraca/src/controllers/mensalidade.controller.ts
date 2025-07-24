import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateMensalidadeService } from '../services/mensalidade/create-mensalida.service';
import { DeleteMensalidadeService } from '../services/mensalidade/delete-mensalidade.service';
import { FindMensalidadeByClienteIdService } from '../services/mensalidade/find-mensalidade-by-cliente-id.service';
import { FindMensalidadeByIdService } from '../services/mensalidade/find-mensalidade-by-id.service';
import { PayMensalidadeService } from '../services/mensalidade/pay-mensalidade.service';

@Service()
export class MensalidadeController {
  constructor(
    private readonly createMensalidadeService: CreateMensalidadeService,
    private readonly findMensalidadeByIdService: FindMensalidadeByIdService,
    private readonly findMensalidadeByClienteIdService: FindMensalidadeByClienteIdService,
    private readonly deleteMensalidadeService: DeleteMensalidadeService,
    private readonly payMensalidadeService: PayMensalidadeService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mensalidade = await this.createMensalidadeService.execute(Number(req.params.clienteId));
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
      const mensalidade = await this.findMensalidadeByIdService.execute(Number(req.params.id));
      res.status(200).json(mensalidade);
    } catch (error) {
      next(error);
    }
  }

  async getByClienteId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mensalidades = await this.findMensalidadeByClienteIdService.execute(Number(req.params.clienteId));
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
}

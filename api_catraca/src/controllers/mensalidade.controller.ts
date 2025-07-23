import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateMensalidadeService } from '../services/mensalidade/create-mensalida.service';
import { DeleteMensalidadeService } from '../services/mensalidade/delete-mensalidade.service';
import { FindMensalidadeByClienteIdService } from '../services/mensalidade/find-mensalidade-by-cliente-id.service';
import { FindMensalidadeByIdService } from '../services/mensalidade/find-mensalidade-by-id.service';
import { UpdateMensalidadeService } from '../services/mensalidade/update-mensalidade.service';

@Service()
export class MensalidadeController {
  constructor(
    private readonly createMensalidadeService: CreateMensalidadeService,
    private readonly findMensalidadeByIdService: FindMensalidadeByIdService,
    private readonly findMensalidadeByClienteIdService: FindMensalidadeByClienteIdService,
    private readonly updateMensalidadeService: UpdateMensalidadeService,
    private readonly deleteMensalidadeService: DeleteMensalidadeService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mensalidade = await this.createMensalidadeService.execute(req.body);
      res.status(201).json(mensalidade);
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

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedMensalidade = await this.updateMensalidadeService.execute(Number(req.params.id), req.body);
      res.status(200).json(updatedMensalidade);
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

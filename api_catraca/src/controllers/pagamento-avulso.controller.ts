import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreatePagamentoAvulsoService } from '../services/pagamento-avulso/create-pagamento-avulso.service';
import { DeletePagamentoAvulsoService } from '../services/pagamento-avulso/delete-pagamento-avulso.service';
import { GetPagamentoAvulsoByIdService } from '../services/pagamento-avulso/get-pagamento-avulso-by-id.service';
import { UpdatePagamentoAvulsoService } from '../services/pagamento-avulso/update-pagamento-avulso.service';
import { CreatePagamentoAvulso, UpdatePagamentoAvulso } from '../types/pagamento-avulso.types';

@Service()
export class PagamentoAvulsoController {
  constructor(
    private readonly createPagamentoAvulsoService: CreatePagamentoAvulsoService,
    private readonly deletePagamentoAvulsoService: DeletePagamentoAvulsoService,
    private readonly getPagamentoAvulsoByIdService: GetPagamentoAvulsoByIdService,
    private readonly updatePagamentoAvulsoService: UpdatePagamentoAvulsoService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const pagamento = await this.createPagamentoAvulsoService.execute(req.body as CreatePagamentoAvulso);
      res.status(201).json(pagamento);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      await this.deletePagamentoAvulsoService.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const pagamento = await this.getPagamentoAvulsoByIdService.execute(id);
      res.status(200).json(pagamento);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const updatedPagamento = await this.updatePagamentoAvulsoService.execute(
        id,
        req.body as UpdatePagamentoAvulso,
      );
      res.status(200).json(updatedPagamento);
    } catch (error) {
      next(error);
    }
  }
}

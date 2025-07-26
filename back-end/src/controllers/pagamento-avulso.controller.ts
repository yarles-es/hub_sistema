import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreatePagamentoAvulsoService } from '../services/pagamento-avulso/create-pagamento-avulso.service';
import { DeletePagamentoAvulsoService } from '../services/pagamento-avulso/delete-pagamento-avulso.service';
import { GetAllPagamentosAvulsoService } from '../services/pagamento-avulso/get-all-pagamentos-avulso.service';
import { GetPagamentoAvulsoByIdService } from '../services/pagamento-avulso/get-pagamento-avulso-by-id.service';
import { UpdatePagamentoAvulsoService } from '../services/pagamento-avulso/update-pagamento-avulso.service';
import { CreatePagamentoAvulso, UpdatePagamentoAvulso } from '../types/pagamento-avulso.types';
import {
  safeParseDate,
  safeParseFormPagamentoArray,
  safeParseInt,
  safeParseString,
} from '../utils/safeTypes';

@Service()
export class PagamentoAvulsoController {
  constructor(
    private readonly createPagamentoAvulsoService: CreatePagamentoAvulsoService,
    private readonly deletePagamentoAvulsoService: DeletePagamentoAvulsoService,
    private readonly getPagamentoAvulsoByIdService: GetPagamentoAvulsoByIdService,
    private readonly updatePagamentoAvulsoService: UpdatePagamentoAvulsoService,
    private readonly getAllPagamentosAvulsoService: GetAllPagamentosAvulsoService,
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

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { numberPage, limit, initialDate, finalDate, observacao, nomeCliente, formaPagamento } =
        req.query;

      console.log('Query Parameters:', req.query);

      const limitNumber = safeParseInt(limit) || 30;
      const page = safeParseInt(numberPage) || 1;
      const initial = safeParseDate(new Date(`${initialDate as string}T00:00:00`));
      const final = safeParseDate(new Date(`${finalDate as string}T23:59:59`));
      const observacaoValue = safeParseString(observacao);
      const nomeClienteValue = safeParseString(nomeCliente);
      const formaPagamentoValue = safeParseFormPagamentoArray(formaPagamento);

      console.log('Parameters:', {
        page,
        limit: limitNumber,
        initialDate: initial,
        finalDate: final,
        observacao: observacaoValue,
        nomeCliente: nomeClienteValue,
        formaPagamento: formaPagamentoValue,
      });

      const pagamentos = await this.getAllPagamentosAvulsoService.execute(page, limitNumber, {
        initialDate: initial,
        finalDate: final,
        observacao: observacaoValue,
        nomeCliente: nomeClienteValue,
        formaPagamento: formaPagamentoValue,
      });

      res.status(200).json(pagamentos);
    } catch (error) {
      next(error);
    }
  }
}

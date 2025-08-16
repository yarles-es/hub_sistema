import { NextFunction, Response } from 'express';
import { Service } from 'typedi';
import { CreatePagamentoAvulsoService } from '../services/pagamento-avulso/create-pagamento-avulso.service';
import { DeletePagamentoAvulsoService } from '../services/pagamento-avulso/delete-pagamento-avulso.service';
import { GetAllPagamentosAvulsoService } from '../services/pagamento-avulso/get-all-pagamentos-avulso.service';
import { GetPagamentoAvulsoByIdService } from '../services/pagamento-avulso/get-pagamento-avulso-by-id.service';
import { UpdatePagamentoAvulsoService } from '../services/pagamento-avulso/update-pagamento-avulso.service';
import { CreatePagamentoAvulso, UpdatePagamentoAvulso } from '../types/pagamento-avulso.types';
import { safeParseFormPagamentoArray, safeParseInt, safeParseString } from '../utils/safeTypes';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { AuthenticatedRequest } from '../types/Request.types';
import { buildUtcRange } from '../utils/date-range';

@Service()
export class PagamentoAvulsoController {
  constructor(
    private readonly createPagamentoAvulsoService: CreatePagamentoAvulsoService,
    private readonly deletePagamentoAvulsoService: DeletePagamentoAvulsoService,
    private readonly getPagamentoAvulsoByIdService: GetPagamentoAvulsoByIdService,
    private readonly updatePagamentoAvulsoService: UpdatePagamentoAvulsoService,
    private readonly getAllPagamentosAvulsoService: GetAllPagamentosAvulsoService,
    private readonly log: CreateLogService,
  ) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const pagamento = await this.createPagamentoAvulsoService.execute(req.body as CreatePagamentoAvulso);

      await this.log.execute(user.id, `Criou diária id: ${pagamento.id}`);

      res.status(201).json(pagamento);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const id = parseInt(req.params.id, 10);

      await this.deletePagamentoAvulsoService.execute(id);

      await this.log.execute(user.id, `Deletou diária id: ${id}`);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const id = parseInt(req.params.id, 10);

      const pagamento = await this.getPagamentoAvulsoByIdService.execute(id);

      await this.log.execute(user.id, `Consultou diária id: ${pagamento.id}`);
      res.status(200).json(pagamento);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const id = parseInt(req.params.id, 10);

      const updatedPagamento = await this.updatePagamentoAvulsoService.execute(
        id,
        req.body as UpdatePagamentoAvulso,
      );

      await this.log.execute(user.id, `Atualizou diária id: ${updatedPagamento.id}`);

      res.status(200).json(updatedPagamento);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { numberPage, limit, initialDate, finalDate, observacao, nomeCliente, formaPagamento } =
        req.query;

      const limitNumber = safeParseInt(limit) || 30;
      const page = safeParseInt(numberPage) || 1;
      const observacaoValue = safeParseString(observacao);
      const nomeClienteValue = safeParseString(nomeCliente);
      const formaPagamentoValue = safeParseFormPagamentoArray(formaPagamento);

      const { startAtUtc, endAtUtc } = buildUtcRange(
        initialDate as string | undefined,
        finalDate as string | undefined,
      );

      const pagamentos = await this.getAllPagamentosAvulsoService.execute(page, limitNumber, {
        initialDate: startAtUtc,
        finalDate: endAtUtc,
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

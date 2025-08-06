import { Service } from 'typedi';
import { PagamentoAvulsoModel } from '../../models/pagamento-avulso.model';
import {
  CreatePagamentoAvulso,
  PagamentoAvulsoFilter,
  PagamentoAvulsoResponse,
  UpdatePagamentoAvulso,
} from '../../types/pagamento-avulso.types';
import { Prisma } from '@prisma/client';

@Service()
export class PagamentoAvulsoService {
  private pagamentoAvulsoModel: PagamentoAvulsoModel;

  constructor() {
    this.pagamentoAvulsoModel = new PagamentoAvulsoModel();
  }

  async createPagamentoAvulso(data: CreatePagamentoAvulso, transaction?: Prisma.TransactionClient) {
    return this.pagamentoAvulsoModel.create(data, transaction);
  }

  async getPagamentoAvulsoById(id: number, transaction?: Prisma.TransactionClient) {
    return this.pagamentoAvulsoModel.findById(id, transaction);
  }

  async updatePagamentoAvulso(
    id: number,
    data: UpdatePagamentoAvulso,
    transaction?: Prisma.TransactionClient,
  ) {
    return this.pagamentoAvulsoModel.update(id, data, transaction);
  }

  async deletePagamentoAvulso(id: number, transaction?: Prisma.TransactionClient) {
    return this.pagamentoAvulsoModel.delete(id, transaction);
  }

  async getAllPagamentoAvulso(
    pageNumber: number,
    limitNumber: number,
    filters?: PagamentoAvulsoFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<PagamentoAvulsoResponse> {
    return this.pagamentoAvulsoModel.getAll(pageNumber, limitNumber, filters, transaction);
  }
}

import { Service } from 'typedi';
import { PagamentoAvulsoModel } from '../../models/pagamento-avulso.model';
import {
  CreatePagamentoAvulso,
  PagamentoAvulsoFilter,
  PagamentoAvulsoResponse,
  UpdatePagamentoAvulso,
} from '../../types/pagamento-avulso.types';

@Service()
export class PagamentoAvulsoService {
  private pagamentoAvulsoModel: PagamentoAvulsoModel;

  constructor() {
    this.pagamentoAvulsoModel = new PagamentoAvulsoModel();
  }

  async createPagamentoAvulso(data: CreatePagamentoAvulso) {
    return this.pagamentoAvulsoModel.create(data);
  }

  async getPagamentoAvulsoById(id: number) {
    return this.pagamentoAvulsoModel.findById(id);
  }

  async updatePagamentoAvulso(id: number, data: UpdatePagamentoAvulso) {
    return this.pagamentoAvulsoModel.update(id, data);
  }

  async deletePagamentoAvulso(id: number) {
    return this.pagamentoAvulsoModel.delete(id);
  }

  async getAllPagamentoAvulso(
    pageNumber: number,
    limitNumber: number,
    filters?: PagamentoAvulsoFilter,
  ): Promise<PagamentoAvulsoResponse> {
    return this.pagamentoAvulsoModel.getAll(pageNumber, limitNumber, filters);
  }
}

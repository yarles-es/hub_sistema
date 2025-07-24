import { Service } from 'typedi';
import { PagamentoAvulsoModel } from '../../models/pagamento-avulso.model';
import { CreatePagamentoAvulso, UpdatePagamentoAvulso } from '../../types/pagamento-avulso.types';

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
}

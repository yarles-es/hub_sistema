import { Service } from 'typedi';
import { PagamentoAvulsoFilter, PagamentoAvulsoResponse } from '../../types/pagamento-avulso.types';
import { PagamentoAvulsoService } from './@pagamento-avulso.service';

@Service()
export class GetAllPagamentosAvulsoService {
  constructor(private readonly pagamentoAvulsoService: PagamentoAvulsoService) {}

  async execute(
    pageNumber: number,
    limitNumber: number,
    filters?: PagamentoAvulsoFilter,
  ): Promise<PagamentoAvulsoResponse> {
    return await this.pagamentoAvulsoService.getAllPagamentoAvulso(pageNumber, limitNumber, filters);
  }
}

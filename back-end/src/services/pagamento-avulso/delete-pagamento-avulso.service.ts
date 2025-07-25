import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { PagamentoAvulsoService } from './@pagamento-avulso.service';

@Service()
export class DeletePagamentoAvulsoService {
  constructor(private readonly pagamentoAvulsoService: PagamentoAvulsoService) {}

  async execute(id: number) {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido');
    }

    const pagamentoAvulso = await this.pagamentoAvulsoService.getPagamentoAvulsoById(id);
    if (!pagamentoAvulso) {
      throw new NotFoundError('Pagamento Avulso não encontrado');
    }
    return this.pagamentoAvulsoService.deletePagamentoAvulso(id);
  }
}

import { Service } from 'typedi';
import { VendaProdutoService } from './@venda-produto.service';
import { GetVendaProdutoByIdResponse } from '../../types/venda-produto.types';
import { NotFoundError } from '../../errors/NotFoundError';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class GetByIdVendaProdutoService {
  constructor(private readonly vendaProdutoService: VendaProdutoService) {}

  public async execute(id: number): Promise<GetVendaProdutoByIdResponse> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido.');
    }

    const vendaProduto = await this.vendaProdutoService.getById(id);

    if (!vendaProduto) throw new NotFoundError('Venda de produto não encontrada');

    return vendaProduto;
  }
}

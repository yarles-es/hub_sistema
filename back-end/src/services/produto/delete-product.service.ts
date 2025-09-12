import { Service } from 'typedi';
import { ProdutoService } from './@produto.service';
import { VendaProdutoService } from '../venda-produto/@venda-produto.service';
import { DeleteProdutoResponse } from '../../types/produto.types';
import { withTransaction } from '../../utils/withTransaction';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class DeleteProdutoService {
  constructor(
    private produtoService: ProdutoService,
    private vendaProdutoService: VendaProdutoService,
  ) {}

  async execute(id: number): Promise<DeleteProdutoResponse> {
    const result = await withTransaction(async (t) => {
      const produto = await this.produtoService.getById(id, t);
      if (!produto) throw new BadRequestError('Produto não encontrado');

      const vendasComProduto = await this.vendaProdutoService.getByProductId(id, t);

      if (vendasComProduto.length > 0) {
        await this.vendaProdutoService.deleteByProductId(id, t);
      }

      const response = await this.produtoService.delete(id, t);

      return response;
    });

    return result;
  }
}

import { Service } from 'typedi';
import { VendaProdutoService } from './@venda-produto.service';
import { GetVendaProdutoByProductIdResponse } from '../../types/venda-produto.types';

@Service()
export class GetVendaProdutosByProdutoIdService {
  constructor(private vendaProdutoService: VendaProdutoService) {}

  async execute(produtoId: number): Promise<GetVendaProdutoByProductIdResponse> {
    const vendaProdutos = await this.vendaProdutoService.getByProductId(produtoId);
    return vendaProdutos;
  }
}

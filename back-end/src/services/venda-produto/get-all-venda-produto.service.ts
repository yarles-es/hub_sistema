import { Service } from 'typedi';
import { VendaProdutoService } from './@venda-produto.service';
import { GetAllVendaProdutoResponse, GetAllVendasProductInput } from '../../types/venda-produto.types';

@Service()
export class GetAllVendaProdutoService {
  constructor(private readonly vendaProdutoService: VendaProdutoService) {}

  public async execute(
    page: number,
    limit: number,
    filters: GetAllVendasProductInput,
  ): Promise<GetAllVendaProdutoResponse> {
    const vendasProdutos = await this.vendaProdutoService.getAll(page, limit, filters);
    return vendasProdutos;
  }
}

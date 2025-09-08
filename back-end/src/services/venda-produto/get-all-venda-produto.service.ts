import { Service } from 'typedi';
import { VendaProdutoService } from './@venda-produto.service';
import { GetAllVendaProdutoResponse } from '../../types/venda-produto.types';

@Service()
export class GetAllVendaProdutoService {
  constructor(private readonly vendaProdutoService: VendaProdutoService) {}

  public async execute(): Promise<GetAllVendaProdutoResponse> {
    const vendasProdutos = await this.vendaProdutoService.getAll();
    return vendasProdutos;
  }
}

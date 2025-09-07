import { Service } from 'typedi';
import { ProdutoService } from './@produto.service';

@Service()
export class GetAllProdutosService {
  constructor(private produtoService: ProdutoService) {}

  async execute(ativo: boolean = true) {
    return await this.produtoService.getAllProdutos(ativo);
  }
}

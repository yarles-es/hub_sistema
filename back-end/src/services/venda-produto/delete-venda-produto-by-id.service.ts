import { Service } from 'typedi';
import { VendaProdutoService } from './@venda-produto.service';
import { ProdutoService } from '../produto/@produto.service';
import { NotFoundError } from '../../errors/NotFoundError';
import { DeleteVendaProdutoResponse, GetVendaProdutoByIdResponse } from '../../types/venda-produto.types';
import { GetProdutoByIdResponse } from '../../types/produto.types';

@Service()
export class DeleteVendaProdutoByIdService {
  constructor(
    private readonly vendaProdutoService: VendaProdutoService,
    private readonly produtoService: ProdutoService,
  ) {}

  public async execute(id: number, atualizarEstoque: boolean = true): Promise<DeleteVendaProdutoResponse> {
    const { vendaProduto, produto } = await this._validate(id);

    if (atualizarEstoque) {
      const estoqueAtualizado = produto!.estoque + vendaProduto!.quantidade;
      await this.produtoService.update(produto!.id, { estoque: estoqueAtualizado });
    }

    const vendaProdutoDeletado = await this.vendaProdutoService.deleteById(id);

    if (!vendaProdutoDeletado) throw new NotFoundError('Venda de produto não encontrada para deletar');

    return vendaProdutoDeletado;
  }

  private async _validate(
    id: number,
  ): Promise<{ vendaProduto: GetVendaProdutoByIdResponse; produto: GetProdutoByIdResponse }> {
    const vendaProduto = await this.vendaProdutoService.getById(id);

    if (!vendaProduto) throw new NotFoundError('Venda de produto não encontrada');

    const produto = await this.produtoService.getById(vendaProduto.produtoId);

    if (!produto) throw new NotFoundError('Produto não encontrado');

    return { vendaProduto, produto };
  }
}

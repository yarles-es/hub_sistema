import { Service } from 'typedi';
import { VendaProdutoService } from './@venda-produto.service';
import { ProdutoService } from '../produto/@produto.service';
import {
  CreateVendaProduto,
  CreateVendaProdutoModel,
  CreateVendaProdutoResponse,
} from '../../types/venda-produto.types';
import { BadRequestError } from '../../errors/BadRequestError';
import { GetProdutoByIdResponse } from '../../types/produto.types';

@Service()
export class CreateVendaProdutoService {
  constructor(
    private readonly vendaProdutoService: VendaProdutoService,
    private readonly produtoService: ProdutoService,
  ) {}

  async execute(data: CreateVendaProduto): Promise<CreateVendaProdutoResponse> {
    const { produto, valorCusto } = await this._validate(data);
    const { estoque } = produto;

    const newData: CreateVendaProdutoModel = { ...data, valorCusto: valorCusto };

    const novoEstoque = estoque - data.quantidade;

    await this.produtoService.update(produto.id, { estoque: novoEstoque });

    const response = await this.vendaProdutoService.create(newData);

    return response;
  }

  private async _validate(
    data: CreateVendaProduto,
  ): Promise<{ produto: GetProdutoByIdResponse; valorCusto: number }> {
    const produto = await this.produtoService.getById(data.produtoId);

    if (!produto) throw new BadRequestError('Produto não encontrado');

    const valorCusto = produto.valorCusto;

    if (produto.estoque < data.quantidade) throw new BadRequestError('Estoque insuficiente');

    if (data.valorVenda <= 0) throw new BadRequestError('Valor de venda deve ser maior que zero');

    if (data.quantidade <= 0) throw new BadRequestError('Quantidade deve ser maior que zero');

    return { produto, valorCusto };
  }
}

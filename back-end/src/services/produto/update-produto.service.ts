import { Service } from 'typedi';
import { ProdutoService } from './@produto.service';
import { UpdateProduto, UpdateProdutoResponse } from '../../types/produto.types';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class UpdateProdutoService {
  constructor(private produtoService: ProdutoService) {}

  async execute(id: number, data: UpdateProduto): Promise<UpdateProdutoResponse> {
    if (!id || isNaN(id) || id <= 0) throw new BadRequestError('ID inválido');

    this._validate(data);

    return await this.produtoService.update(id, data);
  }

  private _validate(data: UpdateProduto) {
    if (data.nome !== undefined && typeof data.nome !== 'string') {
      throw new BadRequestError('Nome deve ser string');
    }

    if (data.valorVenda !== undefined && typeof data.valorVenda !== 'number') {
      throw new BadRequestError('Valor de venda deve ser número');
    }
    if (data.valorCusto !== undefined && typeof data.valorCusto !== 'number') {
      throw new BadRequestError('Valor de custo deve ser número');
    }
    if (data.estoque !== undefined && typeof data.estoque !== 'number') {
      throw new BadRequestError('Estoque deve ser número');
    }

    if (data.ativo !== undefined && typeof data.ativo !== 'boolean') {
      throw new BadRequestError('Ativo deve ser booleano');
    }
  }
}

import { Service } from 'typedi';
import { ProdutoService } from './@produto.service';
import { BadRequestError } from '../../errors/BadRequestError';
import { GetProdutoByIdResponse } from '../../types/produto.types';

@Service()
export class GetProdutoByIdService {
  constructor(private produtoService: ProdutoService) {}

  async execute(id: number): Promise<GetProdutoByIdResponse | null> {
    if (!id || isNaN(id) || id <= 0) throw new BadRequestError('ID inválido');

    return await this.produtoService.getById(id);
  }
}

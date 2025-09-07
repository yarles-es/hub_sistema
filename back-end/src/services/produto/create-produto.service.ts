import { Service } from 'typedi';
import { ProdutoService } from './@produto.service';
import { CreateProduto, CreateProdutoResponse } from '../../types/produto.types';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class CreateProdutoService {
  constructor(private produtoService: ProdutoService) {}

  async execute(data: CreateProduto): Promise<CreateProdutoResponse> {
    this.validate(data);

    return await this.produtoService.createProduto(data);
  }

  private validate(data: CreateProduto) {
    const required = {
      nome: 'Nome é obrigatório',
      valorVenda: 'Valor de venda é obrigatório',
      valorCusto: 'Valor de custo é obrigatório',
      estoque: 'Estoque é obrigatório',
    };

    for (const k in required) {
      const v = (data as any)[k];
      if (v === undefined || v === null) return new BadRequestError((required as any)[k]);
    }

    if (typeof data.nome !== 'string') throw new BadRequestError('Nome deve ser string');

    if (['valorVenda', 'valorCusto', 'estoque'].some((k) => typeof (data as any)[k] !== 'number')) {
      throw new BadRequestError('Valores numéricos inválidos');
    }

    if (data.estoque < 0) throw new BadRequestError('Estoque não pode ser negativo');
    if (data.valorVenda < 0 || data.valorCusto < 0) {
      throw new BadRequestError('Valores não podem ser negativos');
    }
  }
}

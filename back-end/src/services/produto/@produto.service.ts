import { Service } from 'typedi';
import { ProdutoModel } from '../../models/produto.model';
import {
  CreateProduto,
  CreateProdutoResponse,
  GetAllProdutoResponse,
  GetProdutoByIdResponse,
  UpdateProduto,
  UpdateProdutoResponse,
} from '../../types/produto.types';

@Service()
export class ProdutoService {
  constructor(private produtoModel: ProdutoModel) {}

  async getAll(ativo: boolean = true): Promise<GetAllProdutoResponse> {
    return await this.produtoModel.getAll(ativo);
  }

  async create(data: CreateProduto): Promise<CreateProdutoResponse> {
    return await this.produtoModel.create(data);
  }

  async getById(id: number): Promise<GetProdutoByIdResponse> {
    return await this.produtoModel.getById(id);
  }

  async update(id: number, data: UpdateProduto): Promise<UpdateProdutoResponse> {
    return await this.produtoModel.update({ ...data, id });
  }
}

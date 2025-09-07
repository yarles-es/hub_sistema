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

  async getAllProdutos(ativo: boolean = true): Promise<GetAllProdutoResponse> {
    return await this.produtoModel.getAllProdutos(ativo);
  }

  async createProduto(data: CreateProduto): Promise<CreateProdutoResponse> {
    return await this.produtoModel.createProduto(data);
  }

  async getProdutoById(id: number): Promise<GetProdutoByIdResponse> {
    return await this.produtoModel.getProdutoById(id);
  }

  async updateProduto(id: number, data: UpdateProduto): Promise<UpdateProdutoResponse> {
    return await this.produtoModel.updateProduto(id, data);
  }
}

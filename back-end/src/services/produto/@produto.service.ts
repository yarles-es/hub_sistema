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
import { Prisma } from '@prisma/client';

@Service()
export class ProdutoService {
  constructor(private produtoModel: ProdutoModel) {}

  async getAll(ativo?: boolean, transaction?: Prisma.TransactionClient): Promise<GetAllProdutoResponse> {
    return await this.produtoModel.getAll(ativo, transaction);
  }

  async create(data: CreateProduto, transaction?: Prisma.TransactionClient): Promise<CreateProdutoResponse> {
    return await this.produtoModel.create(data, transaction);
  }

  async getById(id: number, transaction?: Prisma.TransactionClient): Promise<GetProdutoByIdResponse | null> {
    return await this.produtoModel.getById(id, transaction);
  }

  async update(
    id: number,
    data: UpdateProduto,
    transaction?: Prisma.TransactionClient,
  ): Promise<UpdateProdutoResponse> {
    return await this.produtoModel.update(id, data, transaction);
  }

  async delete(id: number, transaction?: Prisma.TransactionClient): Promise<UpdateProdutoResponse> {
    return await this.produtoModel.delete(id, transaction);
  }
}

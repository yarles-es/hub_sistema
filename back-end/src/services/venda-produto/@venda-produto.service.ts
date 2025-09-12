import { Service } from 'typedi';
import { VendaProdutoModel } from '../../models/venda-produtos.model';
import {
  CreateVendaProduto,
  CreateVendaProdutoModel,
  CreateVendaProdutoResponse,
  DeleteVendaProdutoResponse,
  GetAllVendaProdutoResponse,
  GetVendaProdutoByIdResponse,
  UpdateVendaProduto,
  UpdateVendaProdutoResponse,
} from '../../types/venda-produto.types';
import { Prisma } from '@prisma/client';

@Service()
export class VendaProdutoService {
  constructor(private readonly vendaProdutoModel: VendaProdutoModel) {}

  async create(
    data: CreateVendaProdutoModel,
    transaction?: Prisma.TransactionClient,
  ): Promise<CreateVendaProdutoResponse> {
    return await this.vendaProdutoModel.create(data, transaction);
  }

  async getById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetVendaProdutoByIdResponse | null> {
    return await this.vendaProdutoModel.getById(id, transaction);
  }

  async getAll(transaction?: Prisma.TransactionClient): Promise<GetAllVendaProdutoResponse> {
    return await this.vendaProdutoModel.getAll(transaction);
  }

  async deleteById(id: number, transaction?: Prisma.TransactionClient): Promise<DeleteVendaProdutoResponse> {
    return await this.vendaProdutoModel.deleteById(id, transaction);
  }

  async update(
    data: UpdateVendaProduto,
    transaction?: Prisma.TransactionClient,
  ): Promise<UpdateVendaProdutoResponse> {
    return await this.vendaProdutoModel.update(data, transaction);
  }

  async getByProductId(
    productId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetVendaProdutoByIdResponse[]> {
    return await this.vendaProdutoModel.getByProductId(productId, transaction);
  }

  async deleteByProductId(productId: number, transaction?: Prisma.TransactionClient): Promise<number> {
    return await this.vendaProdutoModel.deleteByProductId(productId, transaction);
  }
}

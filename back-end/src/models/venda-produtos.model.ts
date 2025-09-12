import { Service } from 'typedi';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreateVendaProduto,
  CreateVendaProdutoModel,
  CreateVendaProdutoResponse,
  DeleteVendaProdutoResponse,
  GetAllVendaProdutoResponse,
  GetVendaProdutoByIdResponse,
  UpdateVendaProduto,
  UpdateVendaProdutoResponse,
} from '../types/venda-produto.types';

@Service()
export class VendaProdutoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(
    data: CreateVendaProdutoModel,
    transaction?: Prisma.TransactionClient,
  ): Promise<CreateVendaProdutoResponse> {
    return await (transaction || this.prisma).vendaProduto.create({ data });
  }

  async getById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetVendaProdutoByIdResponse | null> {
    return await (transaction || this.prisma).vendaProduto.findUnique({
      where: { id },
      include: {
        produto: {
          select: { nome: true },
        },
      },
    });
  }

  async getAll(transaction?: Prisma.TransactionClient): Promise<GetAllVendaProdutoResponse> {
    return await (transaction || this.prisma).vendaProduto.findMany({
      orderBy: { id: 'asc' },
      include: {
        produto: {
          select: { nome: true },
        },
      },
    });
  }

  async update(
    data: UpdateVendaProduto,
    transaction?: Prisma.TransactionClient,
  ): Promise<UpdateVendaProdutoResponse> {
    return await (transaction || this.prisma).vendaProduto.update({ where: { id: data.id }, data });
  }

  async deleteById(id: number, transaction?: Prisma.TransactionClient): Promise<DeleteVendaProdutoResponse> {
    const result = await (transaction || this.prisma).vendaProduto.delete({ where: { id } });
    return result;
  }

  async getByProductId(
    productId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetVendaProdutoByIdResponse[]> {
    return await (transaction || this.prisma).vendaProduto.findMany({
      where: { produtoId: productId },
      include: {
        produto: {
          select: { nome: true },
        },
      },
    });
  }

  async deleteByProductId(productId: number, transaction?: Prisma.TransactionClient): Promise<number> {
    const result = await (transaction || this.prisma).vendaProduto.deleteMany({
      where: { produtoId: productId },
    });
    return result.count;
  }
}

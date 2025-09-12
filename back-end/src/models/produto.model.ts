import { Service } from 'typedi';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreateProduto,
  CreateProdutoResponse,
  GetAllProdutoResponse,
  UpdateProduto,
  UpdateProdutoResponse,
} from '../types/produto.types';

@Service()
export class ProdutoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(ativo?: boolean, transaction?: Prisma.TransactionClient): Promise<GetAllProdutoResponse> {
    const whereClause = ativo ? { ativo: true } : {};
    const prisma = transaction || this.prisma;

    return await prisma.produto.findMany({
      where: whereClause,
      orderBy: { nome: 'asc' },
    });
  }

  async create(data: CreateProduto, transaction?: Prisma.TransactionClient): Promise<CreateProdutoResponse> {
    const prisma = transaction || this.prisma;

    return await prisma.produto.create({
      data,
    });
  }

  async getById(id: number, transaction?: Prisma.TransactionClient): Promise<CreateProdutoResponse | null> {
    const prisma = transaction || this.prisma;

    return await prisma.produto.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: UpdateProduto,
    transaction?: Prisma.TransactionClient,
  ): Promise<UpdateProdutoResponse> {
    const prisma = transaction || this.prisma;

    return await prisma.produto.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, transaction?: Prisma.TransactionClient): Promise<UpdateProdutoResponse> {
    const prisma = transaction || this.prisma;

    return await prisma.produto.delete({
      where: { id },
    });
  }
}

import { Service } from 'typedi';
import { PrismaClient } from '@prisma/client';
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

  async getAll(ativo?: boolean): Promise<GetAllProdutoResponse> {
    const whereClause = ativo ? { ativo: true } : {};

    return await this.prisma.produto.findMany({
      where: whereClause,
      orderBy: { nome: 'asc' },
    });
  }

  async create(data: CreateProduto): Promise<CreateProdutoResponse> {
    return await this.prisma.produto.create({
      data,
    });
  }

  async getById(id: number) {
    return await this.prisma.produto.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateProduto): Promise<UpdateProdutoResponse> {
    return await this.prisma.produto.update({
      where: { id },
      data,
    });
  }
}

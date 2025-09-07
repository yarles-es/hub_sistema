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
export class ProdutosModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllProdutos(ativo: boolean = true): Promise<GetAllProdutoResponse> {
    const whereClause = ativo ? { ativo: true } : {};

    return await this.prisma.produto.findMany({
      where: whereClause,
      orderBy: { nome: 'asc' },
    });
  }

  async createProduto(data: CreateProduto): Promise<CreateProdutoResponse> {
    return await this.prisma.produto.create({
      data,
    });
  }

  async getProdutoById(id: number) {
    return await this.prisma.produto.findUnique({
      where: { id },
    });
  }

  async updateProduto(id: number, data: UpdateProduto): Promise<UpdateProdutoResponse> {
    return await this.prisma.produto.update({
      where: { id },
      data,
    });
  }
}

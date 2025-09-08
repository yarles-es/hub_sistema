import { Service } from 'typedi';
import { PrismaClient } from '@prisma/client';
import {
  CreateVendaProduto,
  CreateVendaProdutoResponse,
  DeleteVendaProdutoResponse,
  GetAllVendaProdutoResponse,
  GetVendaProdutoByIdResponse,
  UpdateVendaProduto,
  UpdateVendaProdutoResponse,
} from '../types/venda-produto.types';

@Service()
export class VendaProdutosModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateVendaProduto): Promise<CreateVendaProdutoResponse> {
    return await this.prisma.vendaProduto.create({ data });
  }

  async getById(id: number): Promise<GetVendaProdutoByIdResponse | null> {
    return await this.prisma.vendaProduto.findUnique({
      where: { id },
      include: {
        produto: {
          select: { nome: true },
        },
      },
    });
  }

  async getAll(): Promise<GetAllVendaProdutoResponse> {
    return await this.prisma.vendaProduto.findMany({
      orderBy: { id: 'asc' },
      include: {
        produto: {
          select: { nome: true },
        },
      },
    });
  }

  async update(data: UpdateVendaProduto): Promise<UpdateVendaProdutoResponse> {
    return await this.prisma.vendaProduto.update({ where: { id: data.id }, data });
  }

  async deleteById(id: number): Promise<DeleteVendaProdutoResponse> {
    const result = await this.prisma.vendaProduto.delete({ where: { id } });
    return result;
  }
}

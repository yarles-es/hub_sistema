import { Service } from 'typedi';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreateVendaProduto,
  CreateVendaProdutoModel,
  CreateVendaProdutoResponse,
  DeleteVendaProdutoResponse,
  GetAllVendaProdutoResponse,
  GetAllVendasProductInput,
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

  async getAll(
    page: number,
    limit: number,
    filters: GetAllVendasProductInput,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetAllVendaProdutoResponse> {
    const client = transaction || this.prisma;
    const where: Prisma.VendaProdutoWhereInput = {};

    const dataHora: Prisma.DateTimeFilter = {};

    if (filters?.initialDate) dataHora.gte = filters.initialDate;
    if (filters?.finalDate) dataHora.lte = filters.finalDate;

    if (filters?.productId) {
      where.produtoId = filters.productId;
    }

    if (Object.keys(dataHora).length > 0) {
      where.dataVenda = dataHora;
    }

    const [data, total, totalVendas, totalCusto, totalLucro] = await Promise.all([
      client.vendaProduto.findMany({
        where,
        include: {
          produto: {
            select: { nome: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          dataVenda: 'desc',
        },
      }),
      client.vendaProduto.count({ where }),
      client.vendaProduto
        .aggregate({
          _sum: {
            valorVenda: true,
          },
          where,
        })
        .then((res) => res._sum.valorVenda ?? 0),

      client.vendaProduto
        .aggregate({
          _sum: {
            valorCusto: true,
          },
          where,
        })
        .then((res) => res._sum.valorCusto ?? 0),
      client.vendaProduto
        .aggregate({
          _sum: {
            valorVenda: true,
            valorCusto: true,
          },
          where,
        })
        .then((res) => (res._sum.valorVenda ?? 0) - (res._sum.valorCusto ?? 0)),
    ]);

    return {
      data,
      total,
      totalVendas,
      totalCusto,
      totalLucro,
      page,
      limit,
    };
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

import { Mensalidade, Prisma, PrismaClient, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import {
  CreateMensalidade,
  MensalidadeFilter,
  MensalidadeResponseGetAll,
  UpdateMensalidade,
} from '../types/mensalidade.types';

@Service()
export class MensalidadeModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(mensalidade: CreateMensalidade): Promise<Mensalidade> {
    return this.prisma.mensalidade.create({
      data: { ...mensalidade },
    });
  }

  public async findById(id: number): Promise<Mensalidade | null> {
    return this.prisma.mensalidade.findUnique({
      where: { id },
    });
  }

  public async findByClienteId(clienteId: number): Promise<Mensalidade[]> {
    return this.prisma.mensalidade.findMany({
      where: { clienteId },
    });
  }

  public async findByClienteIdAndStatus(
    clienteId: number,
    status: StatusMensalidade,
  ): Promise<Mensalidade[]> {
    return this.prisma.mensalidade.findMany({
      where: { clienteId, status },
    });
  }

  public async update(id: number, data: UpdateMensalidade): Promise<Mensalidade> {
    return this.prisma.mensalidade.update({
      where: { id },
      data: { ...data },
    });
  }

  public async delete(id: number): Promise<Mensalidade> {
    return this.prisma.mensalidade.delete({
      where: { id },
    });
  }

  public async findAll(
    page: number,
    limit: number,
    filter?: MensalidadeFilter,
  ): Promise<MensalidadeResponseGetAll> {
    const where: Prisma.MensalidadeWhereInput = {};

    if (filter?.initialDate) {
      where.vencimento = { gte: filter.initialDate };
    }

    if (filter?.finalDate) {
      where.vencimento = { lte: filter.finalDate };
    }

    if (filter?.status && filter.status.length > 0) {
      where.status = { in: filter.status };
    }

    if (filter?.clienteId) {
      where.clienteId = filter.clienteId;
    }

    if (filter?.formaPagamento && filter.formaPagamento.length > 0) {
      where.formaPagamento = { in: filter.formaPagamento };
    }

    const [data, total] = await Promise.all([
      this.prisma.mensalidade.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          vencimento: 'desc',
        },
        include: {
          cliente: {
            select: {
              nome: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.mensalidade.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }
}

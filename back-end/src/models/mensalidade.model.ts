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

  public async create(
    mensalidade: CreateMensalidade,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade> {
    const client = transaction || this.prisma;
    return client.mensalidade.create({
      data: { ...mensalidade },
    });
  }

  public async findById(id: number, transaction?: Prisma.TransactionClient): Promise<Mensalidade | null> {
    const client = transaction || this.prisma;
    return client.mensalidade.findUnique({
      where: { id },
    });
  }

  public async findByClienteId(
    clienteId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade[]> {
    const client = transaction || this.prisma;
    return client.mensalidade.findMany({
      where: { clienteId },
    });
  }

  public async findByClienteIdAndStatus(
    clienteId: number,
    status: StatusMensalidade,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade[]> {
    const client = transaction || this.prisma;
    return client.mensalidade.findMany({
      where: { clienteId, status },
    });
  }

  public async update(
    id: number,
    data: UpdateMensalidade,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade> {
    const client = transaction || this.prisma;
    return client.mensalidade.update({
      where: { id },
      data: { ...data },
    });
  }

  public async delete(id: number, transaction?: Prisma.TransactionClient): Promise<Mensalidade> {
    const client = transaction || this.prisma;
    return client.mensalidade.delete({
      where: { id },
    });
  }

  public async findAll(
    page: number,
    limit: number,
    filter?: MensalidadeFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<MensalidadeResponseGetAll> {
    const client = transaction || this.prisma;
    const where: Prisma.MensalidadeWhereInput = {};

    const vencimento: Prisma.DateTimeFilter = {};

    if (filter?.initialDate) vencimento.gte = filter.initialDate;
    if (filter?.finalDate) vencimento.lte = filter.finalDate;

    if (Object.keys(vencimento).length > 0) {
      where.vencimento = vencimento;
    }

    if (filter?.status && filter.status.length > 0) {
      where.status = { in: filter.status };
    } else {
      where.status = { not: StatusMensalidade.CANCELADO };
    }

    if (filter?.clienteId) {
      where.clienteId = filter.clienteId;
    }

    if (filter?.formaPagamento && filter.formaPagamento.length > 0) {
      where.formaPagamento = { in: filter.formaPagamento };
    }

    const [data, total] = await Promise.all([
      client.mensalidade.findMany({
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
      client.mensalidade.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }
}

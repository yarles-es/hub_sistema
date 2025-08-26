import { Cliente, Prisma, PrismaClient, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import {
  ClienteFilter,
  ClienteGetAllWithMensalidade,
  ClientResponseGetAllModel,
  CountTypeClientes,
  CreateCliente,
  UpdateClient,
} from '../types/cliente.types';

@Service()
export class ClienteModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(cliente: CreateCliente, transaction?: Prisma.TransactionClient): Promise<Cliente> {
    const client = transaction || this.prisma;
    return client.cliente.create({
      data: { ...cliente },
    });
  }

  public async findById(id: number, transaction?: Prisma.TransactionClient): Promise<Cliente | null> {
    const client = transaction || this.prisma;
    return client.cliente.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string, transaction?: Prisma.TransactionClient): Promise<Cliente | null> {
    const client = transaction || this.prisma;
    return client.cliente.findUnique({
      where: { email },
    });
  }

  public async update(
    id: number,
    data: UpdateClient,
    transaction?: Prisma.TransactionClient,
  ): Promise<Cliente> {
    const client = transaction || this.prisma;
    return client.cliente.update({
      where: { id },
      data: { ...data },
    });
  }

  public async delete(id: number, transaction?: Prisma.TransactionClient): Promise<Cliente> {
    const client = transaction || this.prisma;
    return client.cliente.delete({
      where: { id },
    });
  }

  public async findAllByName(
    name: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    const client = transaction || this.prisma;
    return client.cliente.findMany({
      where: { nome: { contains: name, mode: 'insensitive' } },
      orderBy: { id: 'desc' },
      include: {
        Mensalidade: true,
        plano: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },
      },
    });
  }

  public async findByBirthdayPeopleMonth(
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    const prisma = transaction ?? this.prisma;
    const month = new Date().getMonth() + 1;

    const ids = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT "id"
    FROM "clientes"
    WHERE "data_nascimento" IS NOT NULL
      AND EXTRACT(MONTH FROM "data_nascimento") = ${month}
  `;

    if (ids.length === 0) return [];

    const result = await prisma.cliente.findMany({
      where: { id: { in: ids.map((r) => r.id) } },
      include: {
        Mensalidade: true,
        plano: { select: { id: true, nome: true, valor: true } },
      },
      orderBy: { dataNascimento: 'asc' },
    });

    result.sort((a, b) => {
      const da = a.dataNascimento ? new Date(a.dataNascimento).getDate() : 0;
      const db = b.dataNascimento ? new Date(b.dataNascimento).getDate() : 0;
      return da - db;
    });

    return result;
  }

  public async findByDataNascimento(
    date: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade | null> {
    const client = transaction || this.prisma;
    const where: any = {};

    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);

    where.dataNascimento = {
      gte: start,
      lte: end,
    };

    const result = await client.cliente.findMany({
      where: { dataNascimento: where.dataNascimento },
      include: {
        Mensalidade: {
          where: { status: StatusMensalidade.PENDENTE },
        },
        plano: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },
      },
    });

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  public async findAllFiltered(
    page: number,
    limit: number,
    dates: { dataInicialMensalidade?: Date; dataFinalMensalidade?: Date },
    filter?: ClienteFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClientResponseGetAllModel> {
    const client = transaction || this.prisma;

    const where: any = {};

    if (filter?.nome) {
      where.nome = { contains: filter.nome, mode: 'insensitive' };
    }
    if (filter?.email) {
      where.email = { contains: filter.email, mode: 'insensitive' };
    }

    if (filter?.telefone) {
      where.telefone = { contains: filter.telefone, mode: 'insensitive' };
    }

    if (filter?.dataNascimento) {
      const inputDate = new Date(filter.dataNascimento);

      const start = new Date(inputDate);
      start.setUTCHours(0, 0, 0, 0);

      const end = new Date(inputDate);
      end.setUTCHours(23, 59, 59, 999);

      where.dataNascimento = {
        gte: start,
        lte: end,
      };
    }

    if (filter?.planoId) {
      where.planoId = filter.planoId;
    }

    if (dates.dataInicialMensalidade || dates.dataFinalMensalidade) {
      where.Mensalidade = {
        some: {
          vencimento: {
            ...(dates.dataInicialMensalidade && { gte: dates.dataInicialMensalidade }),
            ...(dates.dataFinalMensalidade && { lte: dates.dataFinalMensalidade }),
          },
        },
      };
    }

    const [data, total] = await Promise.all([
      client.cliente.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          Mensalidade: {
            where: {
              ...(dates.dataInicialMensalidade && { vencimento: { gte: dates.dataInicialMensalidade } }),
              ...(dates.dataFinalMensalidade && { vencimento: { lte: dates.dataFinalMensalidade } }),
            },
            orderBy: { vencimento: 'asc' },
          },
          plano: {
            select: {
              id: true,
              nome: true,
              valor: true,
            },
          },
        },
      }),
      client.cliente.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  public async countTypeClientes(transaction?: Prisma.TransactionClient): Promise<CountTypeClientes> {
    const client = transaction || this.prisma;

    const resumo = await client.cliente.groupBy({
      by: ['ativo', 'isento'],
      _count: { _all: true },
    });

    const desativados = resumo.find((r) => r.ativo === false)?._count._all ?? 0;
    const isentos = resumo.find((r) => r.ativo === true && r.isento === true)?._count._all ?? 0;
    const universoAN = resumo.find((r) => r.ativo === true && r.isento === false)?._count._all ?? 0;

    const today0 = new Date();
    today0.setHours(0, 0, 0, 0);
    const vencidos = await client.cliente.count({
      where: {
        ativo: true,
        isento: false,
        Mensalidade: {
          some: {
            status: 'PENDENTE',
            vencimento: { lt: today0 },
          },
        },
      },
    });

    const ativos = await client.cliente.count({
      where: {
        ativo: true,
        isento: false,
        Mensalidade: {
          some: {
            status: 'PENDENTE',
            vencimento: { gte: today0 },
          },
          none: {
            status: 'PENDENTE',
            vencimento: { lt: today0 },
          },
        },
      },
    });

    const mensalidadeInexistente = universoAN - (vencidos + ativos);

    return { ativos, vencidos, desativados, isentos, mensalidadeInexistente };
  }

  async getAllWithMensalidadeByPlanId(
    planoId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    const client = transaction || this.prisma;
    return client.cliente.findMany({
      where: {
        planoId,
      },
      include: {
        Mensalidade: {
          where: {
            status: StatusMensalidade.PENDENTE,
          },
        },
        plano: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  public async findByIdRegistro(
    idRegistro: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade | null> {
    const client = transaction || this.prisma;
    return client.cliente.findUnique({
      where: { catracaId: idRegistro },
      include: {
        Mensalidade: {
          where: { status: StatusMensalidade.PENDENTE },
        },
        plano: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },
      },
    });
  }
}

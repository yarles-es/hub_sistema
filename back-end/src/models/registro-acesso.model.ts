import { Prisma, PrismaClient, RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { CreateRegistroAcesso, FindAllRegisters, RegistroAcessoFilter } from '../types/registro-acesso.types';
import { toIntOrNull } from '../utils/toIntOrNull';

@Service()
export class RegistroAcessoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(
    registro: CreateRegistroAcesso,
    transaction?: Prisma.TransactionClient,
  ): Promise<RegistroAcesso> {
    const client = transaction || this.prisma;
    return client.registroAcesso.create({
      data: {
        ...registro,
      },
    });
  }

  public async findAll(transaction?: Prisma.TransactionClient): Promise<RegistroAcesso[]> {
    const client = transaction || this.prisma;
    return client.registroAcesso.findMany({
      orderBy: { id: 'desc' },
    });
  }

  public async findAllByFilter(
    filter: RegistroAcessoFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<FindAllRegisters[]> {
    const client = transaction || this.prisma;
    const where: Prisma.RegistroAcessoWhereInput = {};
    const dataHora: Prisma.DateTimeFilter = {};

    if (filter.clienteId !== undefined) {
      where.clienteId = filter.clienteId;
    }

    if (filter?.initialDate) dataHora.gte = filter.initialDate;
    if (filter?.finalDate) dataHora.lte = filter.finalDate;

    if (Object.keys(dataHora).length > 0) {
      where.dataHora = dataHora;
    }

    where.dataHora = dataHora;

    const registros = await client.registroAcesso.findMany({
      where,
      include: {
        cliente: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: { dataHora: 'asc' },
    });

    return registros.map((registro) => {
      const { cliente, ...rest } = registro;
      return {
        ...rest,
        nomeCliente: cliente?.nome ?? 'NÃO IDENTIFICADO',
      };
    });
  }

  public async findAllForDay(
    id?: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<FindAllRegisters[]> {
    const client = transaction || this.prisma;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const parsedId = toIntOrNull(id);

    const where: Prisma.RegistroAcessoWhereInput = {
      dataHora: {
        gte: startOfDay,
        lte: endOfDay,
      },
      ...(parsedId !== null ? { id: { gte: parsedId } } : {}),
    };

    const result = await client.registroAcesso.findMany({
      where,
      orderBy: { id: 'desc' },
      include: {
        cliente: {
          select: {
            nome: true,
          },
        },
      },
    });

    return result.map((registro) => {
      const { cliente, ...rest } = registro;
      return {
        ...rest,
        nomeCliente: cliente?.nome ?? 'NÃO IDENTIFICADO',
      };
    });
  }

  public async findAllByClienteId(
    clienteId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<RegistroAcesso[]> {
    const initialHoursDay = new Date();
    initialHoursDay.setHours(0, 0, 0, 0);

    const finalHoursDay = new Date();
    finalHoursDay.setHours(23, 59, 59, 999);

    const where: Prisma.RegistroAcessoWhereInput = {
      clienteId,
      dataHora: {
        gte: initialHoursDay,
        lte: finalHoursDay,
      },
    };
    const client = transaction || this.prisma;
    return client.registroAcesso.findMany({
      where,
      orderBy: { dataHora: 'desc' },
    });
  }
}

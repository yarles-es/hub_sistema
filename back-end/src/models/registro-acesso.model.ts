import { Prisma, PrismaClient, RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { CreateRegistroAcesso } from '../types/registro-acesso.types';

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
      data: registro,
    });
  }

  public async findAll(transaction?: Prisma.TransactionClient): Promise<RegistroAcesso[]> {
    const client = transaction || this.prisma;
    return client.registroAcesso.findMany({
      orderBy: { id: 'desc' },
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

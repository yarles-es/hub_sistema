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
}

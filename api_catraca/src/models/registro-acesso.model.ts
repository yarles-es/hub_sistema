import { PrismaClient, RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class RegistroAcessoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(
    registro: Omit<RegistroAcesso, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RegistroAcesso> {
    return this.prisma.registroAcesso.create({
      data: registro,
    });
  }

  public async findById(id: number): Promise<RegistroAcesso | null> {
    return this.prisma.registroAcesso.findUnique({
      where: { id },
    });
  }

  public async findAll(): Promise<RegistroAcesso[]> {
    return this.prisma.registroAcesso.findMany();
  }
}

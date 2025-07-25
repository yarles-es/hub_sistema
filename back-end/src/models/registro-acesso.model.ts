import { PrismaClient, RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { CreateRegistroAcesso } from '../types/registro-acesso.types';

@Service()
export class RegistroAcessoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(registro: CreateRegistroAcesso): Promise<RegistroAcesso> {
    return this.prisma.registroAcesso.create({
      data: registro,
    });
  }

  public async findAll(): Promise<RegistroAcesso[]> {
    return this.prisma.registroAcesso.findMany();
  }
}

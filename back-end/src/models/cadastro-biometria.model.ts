import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateCadastroBiometria, UpdateCadastroBiometria } from '../types/cadastro-biometria.types';

@Service()
export class CadastroBiometriaModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateCadastroBiometria) {
    return this.prisma.cadastroBiometria.create({
      data: {
        clienteId: data.clienteId,
        idCatraca: data.idCatraca,
      },
    });
  }

  async findFirst() {
    return this.prisma.cadastroBiometria.findFirst();
  }

  async update(id: number, data: UpdateCadastroBiometria) {
    await this.prisma.cadastroBiometria.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.prisma.cadastroBiometria.delete({
      where: { id },
    });
  }
}

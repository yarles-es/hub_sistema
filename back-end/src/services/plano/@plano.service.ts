import { Plano, Prisma } from '@prisma/client';
import { Service } from 'typedi';
import { PlanoModel } from '../../models/plano.model';
import { CreatePlano, UpdatePlano } from '../../types/plano.types';

@Service()
export class PlanoService {
  private planoModel: PlanoModel;

  constructor() {
    this.planoModel = new PlanoModel();
  }

  async createPlano(data: CreatePlano, transaction?: Prisma.TransactionClient): Promise<Plano> {
    const planotransformed: CreatePlano = {
      ...data,
      nome: data.nome.trim().toUpperCase(),
      descricao: data.descricao ? data.descricao.trim().toLowerCase() : null,
    };
    return this.planoModel.create(planotransformed, transaction);
  }

  async getPlanoByName(nome: string, transaction?: Prisma.TransactionClient): Promise<Plano | null> {
    return this.planoModel.findByName(nome.trim().toUpperCase(), transaction);
  }

  async getPlanoById(id: number, transaction?: Prisma.TransactionClient): Promise<Plano | null> {
    return this.planoModel.findById(id, transaction);
  }

  async updatePlano(id: number, data: UpdatePlano, transaction?: Prisma.TransactionClient): Promise<Plano> {
    return this.planoModel.update(id, data, transaction);
  }

  async deletePlano(id: number, transaction?: Prisma.TransactionClient): Promise<Plano> {
    return this.planoModel.delete(id, transaction);
  }

  async getAllPlanos(transaction?: Prisma.TransactionClient): Promise<Plano[]> {
    return this.planoModel.findAll(transaction);
  }
}

import { Plano } from '@prisma/client';
import { Service } from 'typedi';
import { PlanoModel } from '../../models/plano.model';
import { CreatePlano, UpdatePlano } from '../../types/plano.types';

@Service()
export class PlanoService {
  private planoModel: PlanoModel;

  constructor() {
    this.planoModel = new PlanoModel();
  }

  async createPlano(data: CreatePlano): Promise<Plano> {
    const planotransformed: CreatePlano = {
      ...data,
      nome: data.nome.trim().toUpperCase(),
      descricao: data.descricao ? data.descricao.trim().toLowerCase() : null,
    };
    return this.planoModel.create(planotransformed);
  }

  async getPlanoByName(nome: string): Promise<Plano | null> {
    return this.planoModel.findByName(nome.trim().toUpperCase());
  }

  async getPlanoById(id: number): Promise<Plano | null> {
    return this.planoModel.findById(id);
  }

  async updatePlano(id: number, data: UpdatePlano): Promise<Plano> {
    return this.planoModel.update(id, data);
  }

  async deletePlano(id: number): Promise<Plano> {
    return this.planoModel.delete(id);
  }

  async getAllPlanos(): Promise<Plano[]> {
    return this.planoModel.findAll();
  }
}

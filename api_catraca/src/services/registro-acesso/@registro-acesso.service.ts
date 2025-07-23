import { RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { RegistroAcessoModel } from '../../models/registro-acesso.model';

@Service()
export class RegistroAcessoService {
  constructor(private readonly registroAcessoModel: RegistroAcessoModel) {}

  public async createRegistroAcesso(
    registro: Omit<RegistroAcesso, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RegistroAcesso> {
    return await this.registroAcessoModel.create(registro);
  }

  public async findRegistroAcessoById(id: number): Promise<RegistroAcesso | null> {
    return await this.registroAcessoModel.findById(id);
  }

  public async findAllRegistrosAcesso(): Promise<RegistroAcesso[]> {
    return await this.registroAcessoModel.findAll();
  }
}

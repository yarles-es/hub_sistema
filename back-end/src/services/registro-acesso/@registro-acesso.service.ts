import { RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { RegistroAcessoModel } from '../../models/registro-acesso.model';
import { CreateRegistroAcesso } from '../../types/registro-acesso.types';

@Service()
export class RegistroAcessoService {
  constructor(private readonly registroAcessoModel: RegistroAcessoModel) {}

  public async createRegistroAcesso(registro: CreateRegistroAcesso): Promise<RegistroAcesso> {
    return await this.registroAcessoModel.create(registro);
  }

  public async findAllRegistrosAcesso(): Promise<RegistroAcesso[]> {
    return await this.registroAcessoModel.findAll();
  }
}

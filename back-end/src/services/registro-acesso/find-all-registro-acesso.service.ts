import { RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { RegistroAcessoService } from './@registro-acesso.service';

@Service()
export class FindAllRegistroAcessoService {
  constructor(private readonly registroAcessoService: RegistroAcessoService) {}

  public async execute(): Promise<RegistroAcesso[]> {
    return await this.registroAcessoService.findAllRegistrosAcesso();
  }
}

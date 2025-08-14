import { RegistroAcesso } from '@prisma/client';
import { RegistroAcessoService } from './@registro-acesso.service';
import { Service } from 'typedi';

@Service()
export class GetAllRegistroAcessoForDayService {
  constructor(private readonly registroAcessoService: RegistroAcessoService) {}

  public async execute(id?: number): Promise<RegistroAcesso[]> {
    return await this.registroAcessoService.findAllRegistrosForDay(id);
  }
}

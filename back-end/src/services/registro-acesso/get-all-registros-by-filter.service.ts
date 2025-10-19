import { Service } from 'typedi';
import { RegistroAcessoService } from './@registro-acesso.service';
import { RegistroAcessoFilter } from '../../types/registro-acesso.types';
import { Prisma } from '@prisma/client';

@Service()
export class GetAllRegistrosByFilterService {
  constructor(private readonly registroAcessoService: RegistroAcessoService) {}

  public async execute(filter: RegistroAcessoFilter, transaction?: Prisma.TransactionClient) {
    return await this.registroAcessoService.findAllRegistrosByFilter(filter, transaction);
  }
}

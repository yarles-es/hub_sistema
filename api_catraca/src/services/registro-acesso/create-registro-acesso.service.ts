import { RegistroAcesso, TipoCatraca } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { CreateRegistroAcesso } from '../../types/registro-acesso.types';
import { ClienteService } from '../cliente/@cliente.service';
import { RegistroAcessoService } from './@registro-acesso.service';

@Service()
export class CreateRegistroAcessoService {
  constructor(
    private readonly registroAcessoService: RegistroAcessoService,
    private readonly clienteService: ClienteService,
  ) {}

  public async execute(registro: CreateRegistroAcesso): Promise<RegistroAcesso> {
    await this.validate(registro);
    return await this.registroAcessoService.createRegistroAcesso(registro);
  }

  private async validate(registro: CreateRegistroAcesso): Promise<void> {
    if (!registro.clienteId) {
      throw new BadRequestError('Cliente ID é obrigatório');
    }

    const clienteExists = await this.clienteService.getClienteById(registro.clienteId);

    if (!clienteExists) {
      throw new NotFoundError('Cliente não encontrado');
    }

    if (!registro.tipoCatraca || !TipoCatraca[registro.tipoCatraca]) {
      throw new BadRequestError('Tipo de catraca inválido');
    }

    if (!registro.dataHora || isNaN(new Date(registro.dataHora).getTime())) {
      throw new BadRequestError('Data e hora são obrigatórias');
    }
  }
}

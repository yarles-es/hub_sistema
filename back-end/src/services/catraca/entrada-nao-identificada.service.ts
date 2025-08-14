import { Service } from 'typedi';
import { RegistroAcessoService } from '../registro-acesso/@registro-acesso.service';
import { TipoCatraca } from '@prisma/client';
import { bloquearEntradaCatraca } from '../../api/catraca/bloquear-entrada-catraca';

@Service()
export class EntradaNaoIdentificadaService {
  constructor(private readonly registroAcessoService: RegistroAcessoService) {}

  public async execute() {
    await this.registroAcessoService.createRegistroAcesso({
      dataHora: new Date(),
      tipoCatraca: TipoCatraca.BLOQUEIO,
    });
    await bloquearEntradaCatraca();
  }
}

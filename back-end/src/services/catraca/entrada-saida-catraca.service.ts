import { Service } from 'typedi';
import { RegistroAcessoService } from '../registro-acesso/@registro-acesso.service';
import { ClienteService } from '../cliente/@cliente.service';
import { bloquearEntradaCatraca } from '../../api/catraca/bloquear-entrada-catraca';
import { TipoCatraca } from '@prisma/client';
import { formatadorCliente } from '../../utils/formatador-cliente';
import { ClienteGetAllWithMensalidade, StatusCliente } from '../../types/cliente.types';
import { liberarEntradaCatraca } from '../../api/catraca/liberar-entrada-catraca';
import { liberarSaidaCatraca } from '../../api/catraca/liberar-saida-catraca';
import { WebhookCommand774 } from '../../types/catraca.types';

@Service()
export class EntradasaidaCatracaService {
  private readonly TRAVAR: StatusCliente[] = ['DESATIVADO', 'VENCIDO', 'MENSALIDADE_AUSENTE'];

  constructor(
    private readonly registroAcessoService: RegistroAcessoService,
    private readonly clienteService: ClienteService,
  ) {}

  async execute(data: WebhookCommand774) {
    const cliente = await this.getClienteForCommand(data);

    if (!cliente) {
      await bloquearEntradaCatraca();
      return;
    }

    const [clienteFormatado] = formatadorCliente([cliente]);

    if (!clienteFormatado.ativo) {
      await this.bloqueioClienteInativo(cliente.id);
      return;
    }

    if (this.TRAVAR.includes(clienteFormatado.status)) {
      await this.bloqueioClienteInativo(cliente.id);
      return;
    }

    await this.entradaSaidaCatraca(cliente.id);
  }

  private async bloqueioClienteInativo(clienteId: number) {
    await this.registroAcessoService.createRegistroAcesso({
      clienteId,
      tipoCatraca: TipoCatraca.BLOQUEIO,
      dataHora: new Date(),
    });

    await bloquearEntradaCatraca();

    return;
  }

  private async getClienteForCommand(body: WebhookCommand774): Promise<ClienteGetAllWithMensalidade | null> {
    const command = body.command;
    if (command === 774) {
      const id = body.response.identification.id;
      return await this.clienteService.findByIdRegistro(id);
    }

    if (command === 771) {
      const data = body.response.identification.data;
      const date = await this.transformDate(data);
      console.log(date);
      if (date) {
        return await this.clienteService.findByDataNascimento(date);
      }
    }
    return null;
  }

  private async transformDate(data: number) {
    const strData = data.toString();
    if (strData.length !== 8) {
      return;
    }
    const dia = strData.slice(0, 2);
    const mes = strData.slice(2, 4);
    const ano = strData.slice(4, 8);
    return `${ano}-${mes}-${dia}`;
  }

  private async entradaSaidaCatraca(clienteId: number) {
    const registrosAcesso = await this.registroAcessoService.findAllRegistrosByClienteId(clienteId);

    if (registrosAcesso.length === 0) {
      await this.registroAcessoService.createRegistroAcesso({
        clienteId,
        tipoCatraca: TipoCatraca.ENTRADA,
        dataHora: new Date(),
      });

      await liberarEntradaCatraca();
      return;
    }

    if (registrosAcesso[0]?.tipoCatraca === TipoCatraca.SAIDA) {
      await this.registroAcessoService.createRegistroAcesso({
        clienteId,
        tipoCatraca: TipoCatraca.ENTRADA,
        dataHora: new Date(),
      });

      await liberarEntradaCatraca();
      return;
    }

    if (registrosAcesso[0]?.tipoCatraca === TipoCatraca.ENTRADA) {
      await this.registroAcessoService.createRegistroAcesso({
        clienteId,
        tipoCatraca: TipoCatraca.SAIDA,
        dataHora: new Date(),
      });

      await liberarSaidaCatraca();
      return;
    }

    return;
  }
}

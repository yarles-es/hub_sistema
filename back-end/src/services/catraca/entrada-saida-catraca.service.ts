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
    const cliente = await this._getClienteForCommand(data);

    if (!cliente) {
      await bloquearEntradaCatraca();
      return;
    }

    const [clienteFormatado] = formatadorCliente([cliente]);

    if (!clienteFormatado.ativo) {
      await this._bloqueioClienteInativo(cliente.id);
      return;
    }

    if (this.TRAVAR.includes(clienteFormatado.status)) {
      await this._bloqueioClienteInativo(cliente.id);
      return;
    }

    await this._entradaSaidaCatraca(cliente.id);
  }

  private async _bloqueioClienteInativo(clienteId: number) {
    await this.registroAcessoService.createRegistroAcesso({
      clienteId,
      tipoCatraca: TipoCatraca.BLOQUEIO,
      dataHora: new Date(),
    });

    await bloquearEntradaCatraca();

    return;
  }

  private async _getClienteForCommand(body: WebhookCommand774): Promise<ClienteGetAllWithMensalidade | null> {
    const command = body.command;
    if (command === 774) {
      const id = body.response.identification.id;
      return await this.clienteService.findByIdRegistro(id);
    }

    if (command === 771) {
      const data = body.response.identification.data;
      const date = await this._transformDate(data);
      if (date) {
        return await this.clienteService.findByDataNascimento(date);
      }
    }
    return null;
  }

  private _transformDate(data: number): string | null {
    const strData = data.toString().padStart(8, '0');
    if (!/^\d{8}$/.test(strData)) return null;

    const dia = strData.slice(0, 2);
    const mes = strData.slice(2, 4);
    const ano = strData.slice(4, 8);

    const date = new Date(`${ano}-${mes}-${dia}`);
    if (isNaN(date.getTime())) return null;

    return `${ano}-${mes}-${dia}`;
  }

  private async _entradaSaidaCatraca(clienteId: number) {
    const registrosAcesso = await this.registroAcessoService.findAllRegistrosByClienteId(clienteId);
    const registrosAcessoFiltrado = registrosAcesso.filter((r) => r.tipoCatraca !== TipoCatraca.BLOQUEIO);

    if (registrosAcessoFiltrado.length === 0) {
      await this.registroAcessoService.createRegistroAcesso({
        clienteId,
        tipoCatraca: TipoCatraca.ENTRADA,
        dataHora: new Date(),
      });

      await liberarEntradaCatraca();
      return;
    }

    if (registrosAcessoFiltrado[0]?.tipoCatraca === TipoCatraca.SAIDA) {
      await this.registroAcessoService.createRegistroAcesso({
        clienteId,
        tipoCatraca: TipoCatraca.ENTRADA,
        dataHora: new Date(),
      });

      await liberarEntradaCatraca();
      return;
    }

    if (registrosAcessoFiltrado[0]?.tipoCatraca === TipoCatraca.ENTRADA) {
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

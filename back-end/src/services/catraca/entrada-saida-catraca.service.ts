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
import { obterIntervaloSemanaAtual, isDomingo } from '../../utils/plano-periodo';

@Service()
export class EntradasaidaCatracaService {
  private readonly TRAVAR: StatusCliente[] = ['DESATIVADO', 'VENCIDO', 'MENSALIDADE_AUSENTE'];
  private readonly TIPOS_BLOQUEIO: TipoCatraca[] = [
    TipoCatraca.BLOQUEIO,
    TipoCatraca.BLOQUEIO_ATRASO,
    TipoCatraca.BLOQUEIO_LIMITE_ACESSO,
  ];

  constructor(
    private readonly registroAcessoService: RegistroAcessoService,
    private readonly clienteService: ClienteService,
  ) {}

  async execute(data: WebhookCommand774) {
    const cliente = await this._obterClienteParaComando(data);

    if (!cliente) {
      await bloquearEntradaCatraca();
      return;
    }

    const [clienteFormatado] = formatadorCliente([cliente]);

    if (!clienteFormatado.ativo) {
      await this._bloquearCliente(cliente.id, TipoCatraca.BLOQUEIO);
      return;
    }

    if (this.TRAVAR.includes(clienteFormatado.status)) {
      await this._bloquearCliente(cliente.id, this._obterTipoBloqueioPorStatus(clienteFormatado.status));
      return;
    }

    await this._entradaSaidaCatraca(cliente);
  }

  private async _bloquearCliente(clienteId: number, tipoCatraca: TipoCatraca) {
    await this.registroAcessoService.createRegistroAcesso({
      clienteId,
      tipoCatraca,
      dataHora: new Date(),
    });

    await bloquearEntradaCatraca();

    return;
  }

  private async _obterClienteParaComando(body: WebhookCommand774): Promise<ClienteGetAllWithMensalidade | null> {
    const command = body.command;
    if (command === 774) {
      const id = body.response.identification.id;
      return await this.clienteService.findByIdRegistro(id);
    }

    if (command === 771) {
      const data = body.response.identification.data;
      const dataFormatada = this._transformarData(data);
      if (dataFormatada) {
        return await this.clienteService.findByDataNascimento(dataFormatada);
      }
    }
    return null;
  }

  private _transformarData(data: number): string | null {
    const strData = data.toString().padStart(8, '0');
    if (!/^\d{8}$/.test(strData)) return null;

    const dia = strData.slice(0, 2);
    const mes = strData.slice(2, 4);
    const ano = strData.slice(4, 8);

    const date = new Date(`${ano}-${mes}-${dia}`);
    if (isNaN(date.getTime())) return null;

    return `${ano}-${mes}-${dia}`;
  }

  private async _entradaSaidaCatraca(cliente: ClienteGetAllWithMensalidade) {
    const registrosAcesso = await this.registroAcessoService.findAllRegistrosByClienteId(cliente.id);
    const registrosAcessoFiltrado = registrosAcesso.filter((r) => !this.TIPOS_BLOQUEIO.includes(r.tipoCatraca));

    if (registrosAcessoFiltrado.length === 0) {
      const podeEntrar = await this._podeClienteEntrarPorDiasValidosSemana(cliente);

      if (!podeEntrar) {
        await this._bloquearCliente(cliente.id, TipoCatraca.BLOQUEIO_LIMITE_ACESSO);
        return;
      }

      await this.registroAcessoService.createRegistroAcesso({
        clienteId: cliente.id,
        tipoCatraca: TipoCatraca.ENTRADA,
        dataHora: new Date(),
      });

      await liberarEntradaCatraca();
      return;
    }

    if (registrosAcessoFiltrado[0]?.tipoCatraca === TipoCatraca.SAIDA) {
      const podeEntrar = await this._podeClienteEntrarPorDiasValidosSemana(cliente);

      if (!podeEntrar) {
        await this._bloquearCliente(cliente.id, TipoCatraca.BLOQUEIO_LIMITE_ACESSO);
        return;
      }

      await this.registroAcessoService.createRegistroAcesso({
        clienteId: cliente.id,
        tipoCatraca: TipoCatraca.ENTRADA,
        dataHora: new Date(),
      });

      await liberarEntradaCatraca();
      return;
    }

    if (registrosAcessoFiltrado[0]?.tipoCatraca === TipoCatraca.ENTRADA) {
      await this.registroAcessoService.createRegistroAcesso({
        clienteId: cliente.id,
        tipoCatraca: TipoCatraca.SAIDA,
        dataHora: new Date(),
      });

      await liberarSaidaCatraca();
      return;
    }

    return;
  }

  private async _podeClienteEntrarPorDiasValidosSemana(
    cliente: ClienteGetAllWithMensalidade,
  ): Promise<boolean> {
    if (!cliente.plano.validarDiasSemana) {
      return true;
    }

    const diasValidos = cliente.plano.diasValidosSemana;

    if (!diasValidos || diasValidos <= 0) {
      return false;
    }

    const agora = new Date();

    if (isDomingo(agora)) {
      return true;
    }

    const { inicioSemana, fimSemana } = obterIntervaloSemanaAtual(agora);
    const entradas = await this.registroAcessoService.findEntradasByClienteIdAndPeriod(
      cliente.id,
      inicioSemana,
      fimSemana,
    );

    const diasUtilizados = new Set(
      entradas
        .filter((entrada) => !isDomingo(entrada.dataHora))
        .map((entrada) => this._obterChaveDia(entrada.dataHora)),
    );
    const chaveHoje = this._obterChaveDia(agora);

    if (diasUtilizados.has(chaveHoje)) {
      return true;
    }

    return diasUtilizados.size < diasValidos;
  }

  private _obterChaveDia(data: Date): string {
    const dataAtual = new Date(data);
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  private _obterTipoBloqueioPorStatus(status: StatusCliente): TipoCatraca {
    if (status === 'VENCIDO') {
      return TipoCatraca.BLOQUEIO_ATRASO;
    }

    return TipoCatraca.BLOQUEIO;
  }
}

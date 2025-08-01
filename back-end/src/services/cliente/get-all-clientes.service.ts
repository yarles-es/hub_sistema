import { Service } from 'typedi';

import { ClienteFilter, ClienteResponseGetAll, StatusCliente } from '../../types/cliente.types';
import { ClienteService } from './@cliente.service';

@Service()
export class GetAllClientesService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(page: number, limit: number, filter?: ClienteFilter): Promise<ClienteResponseGetAll> {
    const dates = {
      dataInicialMensalidade: filter?.status === 'ATIVO' ? new Date() : undefined,
      dataFinalMensalidade: filter?.status === 'VENCIDO' ? new Date() : undefined,
    };

    delete filter?.status;

    const response = await this.clienteService.getAllClientes(page, limit, dates, filter);

    const clientesFormatted = response.data.map((cliente) => {
      const { Mensalidade, ...rest } = cliente;
      const pendente = Mensalidade.find((m) => m.status === 'PENDENTE');
      let status: StatusCliente = 'ATIVO';
      if (cliente.ativo === false) {
        status = 'DESATIVADO';
      } else if (pendente) {
        status = this.isDataNoPassado(pendente.vencimento) ? 'VENCIDO' : 'ATIVO';
      } else {
        status = 'MENSALIDADE_AUSENTE';
      }

      return {
        ...rest,
        status,
      };
    });

    return {
      data: clientesFormatted,
      total: response.total,
      page: response.page,
      limit: response.limit,
    };
  }

  private isDataNoPassado(data: Date): boolean {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataComparar = new Date(data);
    dataComparar.setHours(0, 0, 0, 0);

    return dataComparar < hoje;
  }
}

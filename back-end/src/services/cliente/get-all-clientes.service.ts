import { Service } from 'typedi';

import { ClienteFilter, ClienteResponseGetAll, StatusCliente } from '../../types/cliente.types';
import { ClienteService } from './@cliente.service';

@Service()
export class GetAllClientesService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(page: number, limit: number, filter?: ClienteFilter): Promise<ClienteResponseGetAll> {
    const dates = {
      dataInicialMensalidade: filter?.status === 'ATIVO' ? new Date() : undefined,
      dataFinalMensalidade: filter?.status === 'INATIVO' ? new Date() : undefined,
    };

    delete filter?.status;

    const response = await this.clienteService.getAllClientes(page, limit, dates, filter);

    const clientesFormatted = response.data.map((cliente) => {
      const { Mensalidade, ...rest } = cliente;
      const pendente = Mensalidade.find((m) => m.status === 'PENDENTE');
      let status: StatusCliente = 'ATIVO';

      if (pendente) {
        status = pendente.vencimento > new Date() ? 'ATIVO' : 'INATIVO';
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
}

import { Service } from 'typedi';

import { ClienteFilter, ClienteResponseGetAll, StatusCliente } from '../../types/cliente.types';
import { ClienteService } from './@cliente.service';
import { formatadorCliente } from '../../utils/formatador-cliente';

@Service()
export class GetAllClientesFilteredService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(page: number, limit: number, filter?: ClienteFilter): Promise<ClienteResponseGetAll> {
    const dates = {
      dataInicialMensalidade: filter?.status === 'ATIVO' ? new Date() : undefined,
      dataFinalMensalidade: filter?.status === 'VENCIDO' ? new Date() : undefined,
    };

    delete filter?.status;

    const response = await this.clienteService.getAllClientesFiltered(page, limit, dates, filter);

    const clientesFormatted = formatadorCliente(response.data);

    return {
      data: clientesFormatted,
      total: response.total,
      page: response.page,
      limit: response.limit,
    };
  }
}

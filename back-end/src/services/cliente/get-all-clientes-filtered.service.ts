import { Service } from 'typedi';

import { ClienteFilter, ClienteResponseGetAll, StatusCliente } from '../../types/cliente.types';
import { ClienteService } from './@cliente.service';
import { formatadorCliente } from '../../utils/formatador-cliente';

@Service()
export class GetAllClientesFilteredService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(page: number, limit: number, filter?: ClienteFilter): Promise<ClienteResponseGetAll> {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const response = await this.clienteService.getAllClientesFiltered(page, limit, filter);

    const clientesFormatted = formatadorCliente(response.data);

    return {
      data: clientesFormatted,
      total: response.total,
      page: response.page,
      limit: response.limit,
    };
  }
}

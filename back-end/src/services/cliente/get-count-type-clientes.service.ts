import { Service } from 'typedi';
import { ClienteService } from './@cliente.service';

@Service()
export class GetCountTypeClientesService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(): Promise<any> {
    const response = await this.clienteService.countTypeClientes();
    return response;
  }
}

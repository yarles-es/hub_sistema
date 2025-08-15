import { Service } from 'typedi';
import { ClienteService } from './@cliente.service';
import { ClienteGetAllWithMensalidade } from '../../types/cliente.types';

@Service()
export class GetAllByBirthdayPeopleMonthService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(): Promise<ClienteGetAllWithMensalidade[]> {
    return this.clienteService.findByBirthdayPeopleMonth();
  }
}

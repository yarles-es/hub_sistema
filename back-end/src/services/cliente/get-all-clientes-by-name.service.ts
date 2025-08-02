import { Service } from 'typedi';
import { ClienteService } from './@cliente.service';
import { Cliente } from '@prisma/client';
import { ClienteGetAll, ClienteGetAllWithMensalidade, StatusCliente } from '../../types/cliente.types';

@Service()
export class GetAllClientesByNameService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(name: string): Promise<ClienteGetAll[]> {
    if (!name || name.trim() === '' || name.length < 3) {
      return [];
    }

    const clientes = await this.clienteService.findAllClientesByName(name.trim());

    const clientesFormatted = clientes.map((cliente) => {
      const { Mensalidade, plano, ...rest } = cliente;
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
        nomePlano: plano.nome,
        valorPlano: plano.valor,
      };
    });

    return clientesFormatted;
  }

  private isDataNoPassado(data: Date): boolean {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataComparar = new Date(data);
    dataComparar.setHours(0, 0, 0, 0);

    return dataComparar < hoje;
  }
}

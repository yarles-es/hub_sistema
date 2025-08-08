import { ClienteGetAll, ClienteGetAllWithMensalidade, StatusCliente } from '../types/cliente.types';

const isDataNoPassado = (data: Date): boolean => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataComparar = new Date(data);
  dataComparar.setHours(0, 0, 0, 0);

  return dataComparar < hoje;
};

export const formatadorCliente = (clientes: ClienteGetAllWithMensalidade[]): ClienteGetAll[] => {
  const clientesFormatted = clientes.map((cliente) => {
    const { Mensalidade, plano, ...rest } = cliente;
    const pendente = Mensalidade.find((m) => m.status === 'PENDENTE');
    let status: StatusCliente = 'ATIVO';
    if (cliente.ativo === false) {
      status = 'DESATIVADO';
    } else if (pendente) {
      status = isDataNoPassado(pendente.vencimento) ? 'VENCIDO' : 'ATIVO';
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
};

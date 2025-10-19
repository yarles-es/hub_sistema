export enum tipoCatraca {
  ENTRADA = "ENTRADA",
  SAIDA = "SAIDA",
  BLOQUEIO = "BLOQUEIO",
}

export type AccessRegistration = {
  id: number;
  clienteId: number;
  nomeCliente: string;
  tipoCatraca: tipoCatraca;
  dataHora: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AccessRegistrationForFilter = {
  initialDate?: string;
  finalDate?: string;
  clienteId?: number;
};

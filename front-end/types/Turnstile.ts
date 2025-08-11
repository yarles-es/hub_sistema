export type startLinkWithTurnstileInput = {
  catracaId: number;
  clienteId: number;
};

export type RegisterTurnstile = {
  id: number;
  clienteId: number;
  idCatraca: number;
  primeiraEtapa: boolean;
  segundaEtapa: boolean;
  terceiraEtapa: boolean;
  errorMessage: string;
};

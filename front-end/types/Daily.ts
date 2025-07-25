export type GetAllDaily = {
  numberPage: number;
  limit: number;
  nomeCliente?: string;
  observacao?: string;
  initialDate?: string;
  finalDate?: string;
  formaPagamento?: PaymentType[];
};

export enum PaymentType {
  DINHEIRO = "DINHEIRO",
  CARTAO = "CARTAO",
  PIX = "PIX",
  GRATIS = "GRATIS",
}

export type Daily = {
  id: number;
  nomeCliente: string | null;
  valor: number;
  formaPagamento: PaymentType;
  dataHora: Date;
  observacao: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllDailyResponse = {
  data: Daily[];
  limit: number;
  page: number;
  total: number;
};

export type CreateDaily = Omit<
  Daily,
  "id" | "createdAt" | "updatedAt" | "dataHora" | "valor"
> & {
  valor: string; // Assuming valor is a string in the form input
};

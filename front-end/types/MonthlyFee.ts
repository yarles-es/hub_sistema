import { PaymentType } from "./Daily";

export enum MonthlyFeeStatus {
  PAGO = "PAGO",
  PENDENTE = "PENDENTE",
  ATRASADO = "ATRASADO",
  CANCELADO = "CANCELADO",
}

export type GetAllMonthlyFees = {
  numberPage: number;
  limit: number;
  clienteId?: number;
  initialDate?: string;
  finalDate?: string;
  status?: MonthlyFeeStatus[];
  formaPagamento?: PaymentType[];
};

export type MonthlyFee = {
  id: number;
  status: MonthlyFeeStatus;
  clienteId: number;
  valor: number;
  formaPagamento: PaymentType | null;
  vencimento: Date;
  valorPago: number | null;
  dataPagamento: Date | null;
};

export type getAllMonthlyFeesResponse = {
  data: (MonthlyFee & { cliente: { nome: string; email: string } })[];
  page: number;
  limit: number;
  total: number;
};

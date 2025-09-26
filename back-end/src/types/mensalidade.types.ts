import { Cliente, FormPagamento, Mensalidade, StatusMensalidade } from '@prisma/client';

export type CreateMensalidade = Pick<Mensalidade, 'clienteId' | 'valor' | 'vencimento'>;

export type UpdateMensalidade = Partial<
  Pick<Mensalidade, 'formaPagamento' | 'status' | 'valor' | 'valorPago'>
>;

export type MensalidadeFilter = {
  initialDate?: Date;
  finalDate?: Date;
  status?: StatusMensalidade[];
  clienteId?: number;
  formaPagamento?: FormPagamento[];
  initialPaymentDate?: Date;
  finalPaymentDate?: Date;
};

export type MensalidadeWithCliente = Mensalidade & {
  cliente: Pick<Cliente, 'nome' | 'email'>;
};

export type MensalidadeResponseGetAll = {
  data: MensalidadeWithCliente[];
  total: number;
  totalPago: number;
  totalPix: number;
  totalCartao: number;
  totalDinheiro: number;
  page: number;
  limit: number;
};

export type PaymentMensalidade = {
  mensalidadeId: number;
  formaPagamento: FormPagamento;
  valorPago: number;
};

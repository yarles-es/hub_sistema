import { PaymentType } from "./Daily";

export type ProductSales = {
  id: number;
  produto: { nome: string };
  productId: number;
  nomeCliente?: string | null;
  quantidade: number;
  valorCusto: number;
  valorVenda: number;
  formaPagamento: PaymentType;
  dataVenda: string;
  createAt: string;
  updateAt: string;
};

export type CreateProductSales = {
  produtoId: number;
  nomeCliente?: string;
  quantidade: number;
  valorVenda: number;
  formaPagamento: PaymentType;
};

export type CreateProductSalesInput = {
  produtoId: number;
  nomeCliente?: string;
  quantidade: string;
  valorVenda: string;
  formaPagamento: PaymentType;
};

export type GetProductSales = {
  numberPage: number;
  limit: number;
  initialDate?: string;
  finalDate?: string;
  productId?: number;
  formaPagamento?: PaymentType[];
};

export type GetProductSalesResponseWithPagination = {
  data: ProductSales[];
  totalVendas: number;
  totalCusto: number;
  totalLucro: number;
  total: number;
  page: number;
  limit: number;
};

export type ProductSales = {
  id: number;
  produto: { nome: string };
  productId: number;
  quantidade: number;
  valorCusto: number;
  valorVenda: number;
  dataVenda: string;
  createAt: string;
  updateAt: string;
};

export type CreateProductSales = {
  produtoId: number;
  quantidade: number;
  valorVenda: number;
};

export type CreateProductSalesInput = {
  produtoId: number;
  quantidade: string;
  valorVenda: string;
};

export type GetProductSales = {
  numberPage: number;
  limit: number;
  initialDate?: string;
  finalDate?: string;
  productId?: number;
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

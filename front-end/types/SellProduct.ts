export type SellProduct = {
  id: number;
  productId: number;
  quantidade: number;
  valorCusto: number;
  valorVenda: number;
  dataVenda: string;
  createAt: string;
  updateAt: string;
};

export type CreateSellProduct = {
  produtoId: number;
  quantidade: number;
  valorVenda: number;
};

export type CreateSellProductInput = {
  produtoId: number;
  quantidade: string;
  valorVenda: string;
};

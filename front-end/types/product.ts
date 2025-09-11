export type Product = {
  id: number;
  nome: string;
  ativo: boolean;
  valorCusto: number;
  valorVenda: number;
  estoque: number;
  descricao: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProduct = {
  nome: string;
  descricao?: string;
  valorVenda: number;
  valorCusto: number;
  estoque: number;
  ativo?: boolean;
};

export type CreateProductInput = {
  nome: string;
  descricao?: string;
  valorVenda: string;
  valorCusto: string;
  estoque: string;
  ativo?: boolean;
};

export type UpdateProductInput = {
  id: number;
  nome?: string;
  descricao?: string;
  valorVenda?: string;
  valorCusto?: string;
  estoque?: string;
};

export type UpdateProduct = {
  id: number;
  nome?: string;
  descricao?: string;
  valorVenda?: number;
  valorCusto?: number;
  estoque?: number;
  ativo?: boolean;
};

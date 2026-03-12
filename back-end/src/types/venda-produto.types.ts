import { FormPagamento, Prisma, VendaProduto } from '@prisma/client';

export type CreateVendaProduto = Pick<VendaProduto, 'produtoId' | 'valorVenda' | 'quantidade'> & {
  formaPagamento: FormPagamento;
};
export type CreateVendaProdutoModel = Pick<
  VendaProduto,
  'produtoId' | 'valorVenda' | 'quantidade' | 'valorCusto'
> & {
  formaPagamento: FormPagamento;
};

export type UpdateVendaProduto = { id: number } & Partial<CreateVendaProduto>;

export type GetVendaProduto = Prisma.VendaProdutoGetPayload<{
  include: { produto: { select: { nome: true } } };
}>;

export type GetVendaProdutoByIdResponse = GetVendaProduto | null;
export type GetVendaProdutoByProductIdResponse = GetVendaProduto[];

export type DeleteVendaProdutoResponse = VendaProduto;

export type CreateVendaProdutoResponse = VendaProduto;

export type UpdateVendaProdutoResponse = VendaProduto;

export type GetAllVendaProdutoResponse = {
  data: GetVendaProduto[];
  totalVendas: number;
  totalCusto: number;
  totalLucro: number;
  total: number;
  page: number;
  limit: number;
};

export type GetAllVendasProductInput = {
  productId?: number;
  initialDate?: Date;
  finalDate?: Date;
  formaPagamento?: FormPagamento[];
};

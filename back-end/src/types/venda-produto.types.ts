import { Prisma, VendaProduto } from '@prisma/client';

export type CreateVendaProduto = Pick<VendaProduto, 'produtoId' | 'valorVenda' | 'quantidade'> & {
  valorCusto?: number;
};

export type CreateVendaProdutoModel = Pick<
  VendaProduto,
  'produtoId' | 'valorVenda' | 'quantidade' | 'valorCusto'
>;

export type UpdateVendaProduto = { id: number } & Partial<CreateVendaProduto>;

export type GetVendaProduto = Prisma.VendaProdutoGetPayload<{
  include: { produto: { select: { nome: true } } };
}>;

export type GetAllVendaProdutoResponse = GetVendaProduto[];

export type GetVendaProdutoByIdResponse = GetVendaProduto | null;

export type DeleteVendaProdutoResponse = VendaProduto;

export type CreateVendaProdutoResponse = VendaProduto;

export type UpdateVendaProdutoResponse = VendaProduto;

import { Produto } from '@prisma/client';

export type CreateProduto = Pick<Produto, 'nome' | 'descricao' | 'valorVenda' | 'valorCusto' | 'estoque'> & {
  ativo?: boolean;
};

export type UpdateProduto = Partial<CreateProduto>;

export type GetAllProdutoResponse = Produto[];

export type GetProdutoByIdResponse = Produto;

export type DeleteProdutoResponse = Produto;

export type CreateProdutoResponse = Produto;

export type UpdateProdutoResponse = Produto;

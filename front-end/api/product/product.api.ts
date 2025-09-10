import { genericRequest } from "../@genericRequest";

import { CreateProduct, Product, UpdateProduct } from "@/types/product";

export const createProduct = async (
  product: CreateProduct
): Promise<Product> => {
  return await genericRequest<Product>("post", "produto/create", {
    body: product,
  });
};

export const getAllProducts = async (): Promise<Product[]> => {
  return await genericRequest<Product[]>("get", "produto/get-all");
};

export const updateProduct = async (
  idProduct: number,
  product: UpdateProduct
): Promise<Product> => {
  const editedProduct: UpdateProduct = {
    nome: product.nome ?? undefined,
    descricao: product.descricao ?? undefined,
    valorVenda: product.valorVenda ?? undefined,
    valorCusto: product.valorCusto ?? undefined,
    estoque: product.estoque ?? undefined,
    ativo: product.ativo ?? undefined,
  };
  return await genericRequest<Product>("put", `produto/update/${idProduct}`, {
    body: editedProduct,
  });
};

export const getProductById = async (idProduct: number): Promise<Product> => {
  return await genericRequest<Product>("get", `produto/get-by-id/${idProduct}`);
};

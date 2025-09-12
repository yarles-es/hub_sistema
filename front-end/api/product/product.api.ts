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
  product: UpdateProduct
): Promise<Product> => {
  const { id, ...rest } = product;

  return await genericRequest<Product>("put", `produto/update/${id}`, {
    body: rest,
  });
};

export const getProductById = async (idProduct: number): Promise<Product> => {
  return await genericRequest<Product>("get", `produto/get-by-id/${idProduct}`);
};

export const deleteProductById = async (idProduct: number): Promise<void> => {
  return await genericRequest<void>("delete", `produto/delete/${idProduct}`);
};

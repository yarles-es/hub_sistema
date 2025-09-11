import { genericRequest } from "../@genericRequest";

import {
  CreateProduct,
  Product,
  UpdateProduct,
  UpdateProductInput,
} from "@/types/product";

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

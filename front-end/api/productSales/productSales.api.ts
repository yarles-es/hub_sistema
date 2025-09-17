import { genericRequest } from "../@genericRequest";

import {
  CreateProductSales,
  GetProductSales,
  GetProductSalesResponseWithPagination,
} from "@/types/ProductSales";
import { createFullUrlFromParamsBackEnd } from "@/utils/generateURLpaginateOrFilter";

export const createProductSales = async (data: CreateProductSales) => {
  return await genericRequest<void>("post", `venda-produto/create`, {
    body: data,
  });
};

export const deleteProductSales = async (id: number) => {
  return await genericRequest<void>("delete", `venda-produto/delete/${id}`);
};

export const getAllProductSales = async (data: GetProductSales) => {
  const queryString = createFullUrlFromParamsBackEnd(data);
  const result = await genericRequest<GetProductSalesResponseWithPagination>(
    "get",
    `venda-produto/get-all?${queryString}`
  );
  return result;
};

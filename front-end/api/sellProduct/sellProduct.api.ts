import { genericRequest } from "../@genericRequest";

import { CreateSellProduct } from "@/types/SellProduct";

export const createSellProduct = async (data: CreateSellProduct) => {
  return await genericRequest<void>("post", `venda-produto/create`, {
    body: data,
  });
};

import { genericRequest } from "../@genericRequest";

import { CreatePlano, Plano } from "@/types/Plano";

export const getAllPlanos = async () => {
  return await genericRequest<Plano[]>("get", "plano/get-all");
};

export const createPlan = async (data: CreatePlano) => {
  const formatedData = {
    ...data,
    valor: parseFloat(data.valor.replace(",", ".")),
  };
  return await genericRequest<Plano>("post", "plano/create", formatedData);
};

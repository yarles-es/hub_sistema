import { genericRequest } from "../@genericRequest";

import { CreatePlano, Plano, UpdatePlano } from "@/types/Plano";

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

export const updatePlan = async (data: UpdatePlano) => {
  const { id, ...rest } = {
    ...data,
    valor: data.valor ? parseFloat(data.valor.replace(",", ".")) : undefined,
  };
  return await genericRequest<Plano>("put", `plano/update/${id}`, rest);
};

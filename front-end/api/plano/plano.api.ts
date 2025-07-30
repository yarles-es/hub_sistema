import { genericRequest } from "../@genericRequest";

import { Plano } from "@/types/Plano";

export const getAllPlanos = async () => {
  return await genericRequest<Plano[]>("get", "plano/get-all");
};

import { genericRequest } from "../@genericRequest";

import { AccessRegistration } from "@/types/AccessRegistration";

export const getAllAccessRegistrationsForDay = async (id: number | null) => {
  return await genericRequest<AccessRegistration[]>(
    "get",
    `registro-acesso/acessos-por-dia/${id}`
  );
};

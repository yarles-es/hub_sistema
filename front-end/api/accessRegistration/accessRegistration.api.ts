import { genericRequest } from "../@genericRequest";

import {
  AccessRegistration,
  AccessRegistrationForFilter,
} from "@/types/AccessRegistration";
import { createFullUrlFromParamsBackEnd } from "@/utils/generateURLpaginateOrFilter";

export const getAllAccessRegistrationsForDay = async (id: number | null) => {
  return await genericRequest<AccessRegistration[]>(
    "get",
    `registro-acesso/acessos-por-dia/${id}`
  );
};

export const getAllAccessRegistrationForFilter = async (
  data: AccessRegistrationForFilter
) => {
  const queryString = createFullUrlFromParamsBackEnd(data);

  return await genericRequest<AccessRegistration[]>(
    "get",
    `registro-acesso/acessos-por-filtro?${queryString}`
  );
};

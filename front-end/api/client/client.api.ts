import { genericRequest } from "../@genericRequest";

import { ClientResponseGetAll, GetAllClient } from "@/types/Client";
import { createFullUrlFromParamsBackEnd } from "@/utils/generateURLpaginateOrFilter";

export const getAllClients = async (data: GetAllClient) => {
  const queryString = createFullUrlFromParamsBackEnd(data);
  return await genericRequest<ClientResponseGetAll>(
    "get",
    `cliente/get-all?${queryString}`
  );
};

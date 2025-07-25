import { genericRequest } from "../@genericRequest";

import {
  CreateDaily,
  Daily,
  GetAllDaily,
  GetAllDailyResponse,
} from "@/types/Daily";
import { createFullUrlFromParamsBackEnd } from "@/utils/generateURLpaginateOrFilter";

export const getAllDaily = async (data: GetAllDaily) => {
  const queryString = createFullUrlFromParamsBackEnd(data);
  return await genericRequest<GetAllDailyResponse>(
    "get",
    `pagamento-avulso/get-all?${queryString}`
  );
};

export const createDaily = async (data: CreateDaily) => {
  const valor = parseFloat(data.valor);
  return await genericRequest<Daily>("post", "pagamento-avulso/create", {
    ...data,
    valor,
  });
};

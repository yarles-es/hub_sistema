import { genericRequest } from "../@genericRequest";

import {
  GetAllMonthlyFees,
  getAllMonthlyFeesResponse,
} from "@/types/MonthlyFee";
import { createFullUrlFromParamsBackEnd } from "@/utils/generateURLpaginateOrFilter";

export const getAllMonthlyFees = async (data: GetAllMonthlyFees) => {
  const queryString = createFullUrlFromParamsBackEnd(data);
  return await genericRequest<getAllMonthlyFeesResponse>(
    "get",
    `mensalidade/get-all?${queryString}`
  );
};

export const cancelMonthlyFee = async (id: number) => {
  return await genericRequest<void>("put", `mensalidade/cancel/${id}`);
};

export const createMonthlyFee = async (clientId: number) => {
  return await genericRequest<void>("post", `mensalidade/create/${clientId}`);
};

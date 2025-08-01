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

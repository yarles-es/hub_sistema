import { genericRequest } from "../@genericRequest";

import { GetLog, GetLogResponseWithPagination } from "@/types/Log";
import { createFullUrlFromParamsBackEnd } from "@/utils/generateURLpaginateOrFilter";

export const getLogs = async (data: GetLog) => {
  const queryString = createFullUrlFromParamsBackEnd(data);
  const result = await genericRequest<GetLogResponseWithPagination>(
    "get",
    `log-sistema/get-all?${queryString}`
  );
  return result;
};

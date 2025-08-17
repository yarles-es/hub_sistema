import { genericRequest } from "../@genericRequest";

import {
  CreateDaily,
  Daily,
  GetAllDaily,
  GetAllDailyResponse,
  UpdateDaily,
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
    body: { ...data, valor },
  });
};

export const deleteDaily = async (id: number) => {
  return await genericRequest<Daily>("delete", `pagamento-avulso/delete/${id}`);
};

export const updateDaily = async (data: UpdateDaily) => {
  const { id, ...rest } = {
    ...data,
    valor: data.valor ? parseFloat(data.valor) : undefined,
  };

  return await genericRequest<Daily>(
    "put",
    `pagamento-avulso/update/${data.id}`,
    {
      body: { ...rest },
    }
  );
};

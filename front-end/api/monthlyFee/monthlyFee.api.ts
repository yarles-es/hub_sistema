import { genericRequest } from "../@genericRequest";

import {
  GetAllMonthlyFees,
  getAllMonthlyFeesResponse,
  MonthlyFeeWithClient,
  PaymentMonthlyFee,
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

export const payMonthlyFee = async (data: PaymentMonthlyFee) => {
  const { id, ...rest } = {
    ...data,
    valorPago: data.valorPago ? parseFloat(data.valorPago) : null,
  };

  return await genericRequest<void>("put", `mensalidade/pay/${id}`, {
    body: rest,
  });
};

export const getAllPendingByClientId = async (clientId: number) => {
  return await genericRequest<MonthlyFeeWithClient[]>(
    "get",
    `mensalidade/get-all-pending/${clientId}`
  );
};

export const getMonthlyFeeById = async (id: number) => {
  return await genericRequest<MonthlyFeeWithClient>(
    "get",
    `mensalidade/get-by-id/${id}`
  );
};

export const deleteMonthlyFeeById = async (id: number) => {
  return await genericRequest<void>("delete", `mensalidade/delete/${id}`);
};

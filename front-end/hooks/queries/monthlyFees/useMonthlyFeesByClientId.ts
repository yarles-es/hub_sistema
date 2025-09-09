"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { monthlyFeeKeys } from "../@queryKeys/monthlyFee.keys";

import {
  getAllPendingByClientId,
  getMonthlyFeeById,
} from "@/api/monthlyFee/monthlyFee.api";
import { MonthlyFeeWithClient } from "@/types/MonthlyFee";

export function useMonthlyFeesByClientId(
  clientId: number = 0,
  options?: Omit<
    UseQueryOptions<
      MonthlyFeeWithClient[],
      Error,
      MonthlyFeeWithClient[],
      ReturnType<typeof monthlyFeeKeys.byClientId>
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) {
  const fetchMonthlyFeesByIdClient = async () => {
    if (clientId) {
      const response = await getAllPendingByClientId(clientId);
      return response;
    }
    return [];
  };

  return useQuery({
    queryKey: monthlyFeeKeys.byClientId(clientId),
    queryFn: fetchMonthlyFeesByIdClient,
    enabled: !!clientId && clientId > 0,
    ...options,
  });
}

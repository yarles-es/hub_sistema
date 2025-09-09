"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import {
  getAllPendingByClientId,
  getMonthlyFeeById,
} from "@/api/monthlyFee/monthlyFee.api";
import { monthlyFeeKeys } from "@/hooks/useQuery/@queryKeys/monthlyFee.keys";
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

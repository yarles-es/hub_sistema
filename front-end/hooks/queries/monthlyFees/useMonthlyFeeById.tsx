"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getMonthlyFeeById } from "@/api/monthlyFee/monthlyFee.api";
import { monthlyFeeKeys } from "@/hooks/queryKeys/monthlyFee.keys";
import { MonthlyFeeWithClient } from "@/types/MonthlyFee";

export function useMonthlyFeeById(
  id: number,
  options?: Omit<
    UseQueryOptions<
      MonthlyFeeWithClient,
      Error,
      MonthlyFeeWithClient,
      ReturnType<typeof monthlyFeeKeys.detail>
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) {
  return useQuery({
    queryKey: monthlyFeeKeys.detail(id),
    queryFn: () => getMonthlyFeeById(id),
    enabled: !!id && id !== 0,
    ...options,
  });
}

"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getAllMonthlyFees } from "@/api/monthlyFee/monthlyFee.api";
import { monthlyFeeKeys } from "@/hooks/queryKeys/monthlyFee.keys";
import {
  GetAllMonthlyFees,
  getAllMonthlyFeesResponse,
} from "@/types/MonthlyFee";

export function useMonthlyFees(
  queryParams: GetAllMonthlyFees,
  options?: Omit<
    UseQueryOptions<
      getAllMonthlyFeesResponse,
      Error,
      getAllMonthlyFeesResponse,
      ReturnType<typeof monthlyFeeKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: monthlyFeeKeys.list(queryParams),
    queryFn: () => getAllMonthlyFees(queryParams),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}

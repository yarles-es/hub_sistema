"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { dailyKeys } from "../@queryKeys/daily.keys";

import { getAllDaily } from "@/api/finance/daily.api";
import { GetAllDaily, GetAllDailyResponse } from "@/types/Daily";

export function useGetAllDaily(
  queryParams: GetAllDaily,
  options?: Omit<
    UseQueryOptions<
      GetAllDailyResponse,
      Error,
      GetAllDailyResponse,
      ReturnType<typeof dailyKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: dailyKeys.list(queryParams),
    queryFn: () => getAllDaily(queryParams),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}

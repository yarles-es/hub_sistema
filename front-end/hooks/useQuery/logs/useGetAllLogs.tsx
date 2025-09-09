"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { dailyKeys } from "../@queryKeys/daily.keys";

import { getLogs } from "@/api/logs/logs.api";
import { GetLog, GetLogResponseWithPagination } from "@/types/Log";

export function useGetAllLogs(
  queryParams: GetLog,
  options?: Omit<
    UseQueryOptions<
      GetLogResponseWithPagination,
      Error,
      GetLogResponseWithPagination,
      ReturnType<typeof dailyKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: dailyKeys.list(queryParams),
    queryFn: () => getLogs(queryParams),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}

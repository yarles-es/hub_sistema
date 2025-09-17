"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { logKeys } from "../@queryKeys/log.keys";

import { getLogs } from "@/api/logs/logs.api";
import { GetLog, GetLogResponseWithPagination } from "@/types/Log";

export function useGetAllLogs(
  queryParams: GetLog,
  options?: Omit<
    UseQueryOptions<
      GetLogResponseWithPagination,
      Error,
      GetLogResponseWithPagination,
      ReturnType<typeof logKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: logKeys.list(queryParams),
    queryFn: () => getLogs(queryParams),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}

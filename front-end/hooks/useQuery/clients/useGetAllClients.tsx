"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { clientKeys } from "../@queryKeys/clients.keys";

import { getAllClients } from "@/api/client/client.api";
import { ClientResponseGetAll, GetAllClient } from "@/types/Client";

export function useGetAllClients(
  queryParams: GetAllClient,
  options?: Omit<
    UseQueryOptions<
      ClientResponseGetAll,
      Error,
      ClientResponseGetAll,
      ReturnType<typeof clientKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: clientKeys.list(queryParams),
    queryFn: () => getAllClients(queryParams),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}

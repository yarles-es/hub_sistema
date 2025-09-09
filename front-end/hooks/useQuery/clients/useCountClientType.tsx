import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { clientKeys } from "../@queryKeys/clients.keys";

import { getCountClients } from "@/api/client/client.api";
import { CountClients } from "@/types/Client";

export function useCountClientType(
  options?: Omit<
    UseQueryOptions<
      CountClients,
      Error,
      CountClients,
      ReturnType<typeof clientKeys.countType>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: clientKeys.countType(),
    queryFn: getCountClients,
    retry: 0,
    refetchInterval: 300000,
    refetchOnWindowFocus: true,
    ...options,
  });
}

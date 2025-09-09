import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { clientKeys } from "../@queryKeys/clients.keys";

import { getAllByBirthdayPeopleMonth } from "@/api/client/client.api";
import { Client } from "@/types/Client";

export function useGetAllbyBirthdayMonth(
  options?: Omit<
    UseQueryOptions<
      Client[],
      Error,
      Client[],
      ReturnType<typeof clientKeys.birthdaysMonth>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: clientKeys.birthdaysMonth(),
    queryFn: () => getAllByBirthdayPeopleMonth(),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}

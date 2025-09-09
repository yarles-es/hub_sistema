"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { planKeys } from "../@queryKeys/plan.keys";

import { getAllPlans } from "@/api/plano/plano.api";
import { Plano } from "@/types/Plano";

export function useGetAllPlans(
  options?: Omit<
    UseQueryOptions<Plano[], Error, Plano[], ReturnType<typeof planKeys.list>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: planKeys.list(),
    queryFn: () => getAllPlans(),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}

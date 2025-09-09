"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { turnstileKeys } from "../@queryKeys/turnstile.keys";

import { getAvailableId } from "@/api/turnstile/turnstile.api";

export function useGetAvailableIdTurnstile(
  id?: number,
  options?: Omit<
    UseQueryOptions<
      { id: number },
      Error,
      { id: number },
      ReturnType<typeof turnstileKeys.availableId>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: turnstileKeys.availableId(id),
    queryFn: getAvailableId,
    enabled: !!id,
    gcTime: 0,
    retry: 0,
    refetchOnWindowFocus: false,
    ...options,
  });
}

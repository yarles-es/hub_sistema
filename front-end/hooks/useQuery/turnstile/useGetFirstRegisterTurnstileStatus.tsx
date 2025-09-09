import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { turnstileKeys } from "../@queryKeys/turnstile.keys";

import { getFirstRegisterTurnstile } from "@/api/turnstile/turnstile.api";
import { RegisterTurnstile } from "@/types/Turnstile";

export function useGetFirstRegisterTurnstileStatus(
  options?: Omit<
    UseQueryOptions<
      RegisterTurnstile,
      Error,
      RegisterTurnstile,
      ReturnType<typeof turnstileKeys.registerTurnstileStatus>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: turnstileKeys.registerTurnstileStatus(),
    queryFn: getFirstRegisterTurnstile,
    retry: 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}

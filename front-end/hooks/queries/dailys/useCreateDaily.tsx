"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { createDaily } from "@/api/finance/daily.api";
import { dailyKeys } from "@/hooks/queryKeys/daily.keys";
import { CreateDaily } from "@/types/Daily";
type Variables = CreateDaily;
type Data = unknown;
type Err = Error;

export function useCreateDaily(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => createDaily(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dailyKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}

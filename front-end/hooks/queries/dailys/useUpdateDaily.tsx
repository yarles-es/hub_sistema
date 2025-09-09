"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { updateDaily } from "@/api/finance/daily.api";
import { dailyKeys } from "@/hooks/queryKeys/daily.keys";
import { UpdateDaily } from "@/types/Daily";
type Variables = UpdateDaily;
type Data = unknown;
type Err = Error;

export function useUpdateDaily(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateDaily(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dailyKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}

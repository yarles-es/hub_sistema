"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteDaily } from "@/api/finance/daily.api";
import { dailyKeys } from "@/hooks/queryKeys/daily.keys";
type Variables = number;
type Data = unknown;
type Err = Error;

export function useDeleteDaily(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteDaily(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dailyKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}

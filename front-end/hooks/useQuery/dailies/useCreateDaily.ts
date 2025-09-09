"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDaily } from "@/api/finance/daily.api";
import { dailyKeys } from "@/hooks/useQuery/@queryKeys/daily.keys";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { CreateDaily } from "@/types/Daily";
type Variables = CreateDaily;

export function useCreateDaily(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => createDaily(payload),
    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: dailyKeys.all, exact: false });
      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}

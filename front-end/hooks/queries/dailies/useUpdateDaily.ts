"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dailyKeys } from "../@queryKeys/daily.keys";

import { updateDaily } from "@/api/finance/daily.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { UpdateDaily } from "@/types/Daily";

type Variables = UpdateDaily;

export function useUpdateDaily(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => updateDaily(payload),

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

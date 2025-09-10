"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { planKeys } from "../@queryKeys/plan.keys";

import { activatePlan } from "@/api/plano/plano.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";

type Variables = number;

export function useActivePlan(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => activatePlan(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: planKeys.all, exact: false });
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

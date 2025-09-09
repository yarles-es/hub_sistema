"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { planKeys } from "../@queryKeys/plan.keys";

import { updatePlan } from "@/api/plano/plano.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { UpdatePlano } from "@/types/Plano";

type Variables = UpdatePlano;

export function useUpdatePlan(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => updatePlan(payload),

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

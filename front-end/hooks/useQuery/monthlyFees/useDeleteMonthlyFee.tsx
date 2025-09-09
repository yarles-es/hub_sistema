"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMonthlyFeeById } from "@/api/monthlyFee/monthlyFee.api";
import { monthlyFeeKeys } from "@/hooks/useQuery/@queryKeys/monthlyFee.keys";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";

type Variables = number;

export function useDeleteMonthlyFee(
  options?: OptionsTypeUseMutation<Variables>
) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (id) => deleteMonthlyFeeById(id),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: monthlyFeeKeys.all, exact: false });
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

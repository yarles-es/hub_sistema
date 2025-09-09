"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { monthlyFeeKeys } from "../@queryKeys/monthlyFee.keys";

import { payMonthlyFee } from "@/api/monthlyFee/monthlyFee.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { PaymentMonthlyFee } from "@/types/MonthlyFee";

type Variables = PaymentMonthlyFee;

export function usePayMonthlyFee(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (data: PaymentMonthlyFee) => payMonthlyFee(data),

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

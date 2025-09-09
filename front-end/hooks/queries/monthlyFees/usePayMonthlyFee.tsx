"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import {
  cancelMonthlyFee,
  payMonthlyFee,
} from "@/api/monthlyFee/monthlyFee.api";
import { monthlyFeeKeys } from "@/hooks/queryKeys/monthlyFee.keys";
import { PaymentMonthlyFee } from "@/types/MonthlyFee";

type Variables = PaymentMonthlyFee;
type Data = unknown;
type Err = Error;

export function usePayMonthlyFee(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentMonthlyFee) => payMonthlyFee(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: monthlyFeeKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}

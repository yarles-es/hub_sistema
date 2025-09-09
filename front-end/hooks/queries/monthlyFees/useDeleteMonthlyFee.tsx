"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteMonthlyFeeById } from "@/api/monthlyFee/monthlyFee.api";
import { monthlyFeeKeys } from "@/hooks/queryKeys/monthlyFee.keys";

type Variables = number;
type Data = unknown;
type Err = Error;

export function useDeleteMonthlyFee(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteMonthlyFeeById(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: monthlyFeeKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productKeys } from "../@queryKeys/product.keys";
import { sellProductKeys } from "../@queryKeys/sellProduct.keys";

import { createSellProduct } from "@/api/sellProduct/sellProduct.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { CreateSellProduct } from "@/types/SellProduct";

type Variables = CreateSellProduct;

export function useCreateSellProduct(
  options?: OptionsTypeUseMutation<Variables>
) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => createSellProduct(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: sellProductKeys.all, exact: false });
      qc.invalidateQueries({ queryKey: productKeys.all, exact: false });
      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },

    retry: 0,
  });
}

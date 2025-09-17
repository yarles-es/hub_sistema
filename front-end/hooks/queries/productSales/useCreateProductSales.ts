"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productKeys } from "../@queryKeys/product.keys";
import { ProductSalesKeys } from "../@queryKeys/ProductSales.keys";

import { createProductSales } from "@/api/productSales/productSales.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { CreateProductSales } from "@/types/ProductSales";

type Variables = CreateProductSales;

export function useCreateProductSales(
  options?: OptionsTypeUseMutation<Variables>
) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => createProductSales(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: ProductSalesKeys.all, exact: false });
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

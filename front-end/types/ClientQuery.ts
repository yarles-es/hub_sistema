import { UseMutationOptions } from "@tanstack/react-query";

export type DataMutation = unknown;
export type ErrMutation = Error;

export type OptionsTypeUseMutation<TVariables = unknown> = Pick<
  UseMutationOptions<DataMutation, ErrMutation, TVariables>,
  "onSuccess" | "onError" | "onSettled"
>;

export const monthlyFeeKeys = {
  all: ["monthlyFees"] as const,
  list: (params?: unknown) =>
    [...monthlyFeeKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...monthlyFeeKeys.all, "detail", id] as const,
};

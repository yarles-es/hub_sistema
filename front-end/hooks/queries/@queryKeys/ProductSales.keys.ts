export const ProductSalesKeys = {
  all: ["ProductSales"] as const,
  list: (params?: unknown) =>
    [...ProductSalesKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...ProductSalesKeys.all, "detail", id] as const,
};

export const productKeys = {
  all: ["products"] as const,
  list: (params?: unknown) =>
    [...productKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...productKeys.all, "detail", id] as const,
};

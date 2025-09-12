export const sellProductKeys = {
  all: ["sellProducts"] as const,
  list: (params?: unknown) =>
    [...sellProductKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...sellProductKeys.all, "detail", id] as const,
};

export const dailyKeys = {
  all: ["dailys"] as const,
  list: (params?: unknown) => [...dailyKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...dailyKeys.all, "detail", id] as const,
};

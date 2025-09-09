export const userKeys = {
  all: ["users"] as const,
  list: (params?: unknown) => [...userKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
};

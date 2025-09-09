export const planKeys = {
  all: ["plans"] as const,
  list: (params?: unknown) => [...planKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...planKeys.all, "detail", id] as const,
};

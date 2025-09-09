export const clientKeys = {
  all: ["clients"] as const,
  list: (params?: unknown) =>
    [...clientKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...clientKeys.all, "detail", id] as const,
};

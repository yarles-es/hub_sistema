export const logKeys = {
  all: ["logs"] as const,
  list: (params?: unknown) => [...logKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...logKeys.all, "detail", id] as const,
};

export const turnstileKeys = {
  all: ["turnstiles"] as const,
  list: (params?: unknown) =>
    [...turnstileKeys.all, "list", params ?? {}] as const,
  availableId: (id?: number) =>
    [...turnstileKeys.all, "availableId", id ?? "none"] as const,
  registerTurnstileStatus: () =>
    [...turnstileKeys.all, "registerStatus"] as const,
};

export const accessRegistrationKeys = {
  all: ["registrations"] as const,
  list: (params?: unknown) =>
    [...accessRegistrationKeys.all, "list", params ?? {}] as const,
};

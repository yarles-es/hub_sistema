type MaybeNumber = number | string | null | undefined;

export function toIntOrNull(v: MaybeNumber): number | null {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'string' ? Number(v) : v;
  return Number.isInteger(n as number) ? (n as number) : null;
}

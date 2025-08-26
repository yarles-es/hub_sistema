const SP_OFFSET_HOURS = 0;

function toUtcDayStart(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, SP_OFFSET_HOURS, 0, 0, 0));
}

function toUtcDayEnd(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1, SP_OFFSET_HOURS, 0, 0, 0) - 1);
}

export function buildUtcRange(initialDate?: string, finalDate?: string) {
  if (!initialDate && !finalDate) return { startAtUtc: undefined, endAtUtc: undefined };

  if (initialDate && !finalDate) {
    return { startAtUtc: toUtcDayStart(initialDate), endAtUtc: toUtcDayEnd(initialDate) };
  }
  if (!initialDate && finalDate) {
    return { startAtUtc: toUtcDayStart(finalDate), endAtUtc: toUtcDayEnd(finalDate) };
  }

  const startAtUtc = toUtcDayStart(initialDate!);
  const endAtUtc = toUtcDayEnd(finalDate!);

  if (startAtUtc > endAtUtc) {
    return { startAtUtc, endAtUtc: toUtcDayEnd(initialDate!) };
  }

  return { startAtUtc, endAtUtc };
}

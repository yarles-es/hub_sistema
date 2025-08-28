"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUtcRange = buildUtcRange;
const SP_OFFSET_HOURS = 0;
function toUtcDayStart(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, SP_OFFSET_HOURS, 0, 0, 0));
}
function toUtcDayEnd(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d + 1, SP_OFFSET_HOURS, 0, 0, 0) - 1);
}
function buildUtcRange(initialDate, finalDate) {
    if (!initialDate && !finalDate)
        return { startAtUtc: undefined, endAtUtc: undefined };
    if (initialDate && !finalDate) {
        return { startAtUtc: toUtcDayStart(initialDate), endAtUtc: toUtcDayEnd('2100-01-01') };
    }
    if (!initialDate && finalDate) {
        return { startAtUtc: toUtcDayStart('2000-01-01'), endAtUtc: toUtcDayEnd(finalDate) };
    }
    const startAtUtc = toUtcDayStart(initialDate);
    const endAtUtc = toUtcDayEnd(finalDate);
    if (startAtUtc > endAtUtc) {
        return { startAtUtc, endAtUtc: toUtcDayEnd(initialDate) };
    }
    return { startAtUtc, endAtUtc };
}

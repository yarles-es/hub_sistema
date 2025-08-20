"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toIntOrNull = toIntOrNull;
function toIntOrNull(v) {
    if (v === null || v === undefined || v === '')
        return null;
    const n = typeof v === 'string' ? Number(v) : v;
    return Number.isInteger(n) ? n : null;
}

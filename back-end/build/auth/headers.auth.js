"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthHeaders = setAuthHeaders;
function setAuthHeaders(res, token) {
    res.removeHeader('Authorization');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Authorization', token);
    return res;
}

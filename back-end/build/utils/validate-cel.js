"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCel = void 0;
const validateCel = (cel) => {
    const regex = /^(?:\(?\d{2}\)?\s?)?(?:9\d{4}-?\d{4}|\d{4}-?\d{4})$/;
    return regex.test(cel);
};
exports.validateCel = validateCel;

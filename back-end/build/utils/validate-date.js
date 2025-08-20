"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateGreaterThanToday = exports.validateDate = void 0;
const validateDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    return dateRegex.test(date);
};
exports.validateDate = validateDate;
const validateDateGreaterThanToday = (date) => {
    const today = new Date();
    return date > today;
};
exports.validateDateGreaterThanToday = validateDateGreaterThanToday;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleZodValidationError = (error) => {
    const all_errors = error.issues.map((el) => {
        var _a;
        return { path: el === null || el === void 0 ? void 0 : el.path[((_a = el === null || el === void 0 ? void 0 : el.path) === null || _a === void 0 ? void 0 : _a.length) - 1], message: el === null || el === void 0 ? void 0 : el.message };
    });
    console.log('====================================');
    console.log();
    console.log('====================================');
    return {
        status_code: 400,
        message: 'Validation error;Some values are missing or incorrect',
        errorMessages: all_errors,
    };
};
exports.default = HandleZodValidationError;

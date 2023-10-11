"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    var _a, _b;
    const all_errors = [
        {
            path: "",
            message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "There have issue currently",
        },
    ];
    return {
        status_code: 400,
        message: (_b = err === null || err === void 0 ? void 0 : err.message) !== null && _b !== void 0 ? _b : "Validation Error;Some values are missing or incorrect",
        errorMessages: all_errors,
    };
};
exports.handleValidationError = handleValidationError;

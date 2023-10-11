"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleKnownError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleKnownError = (err) => {
    var _a, _b;
    const all_errors = [
        {
            path: "",
            message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "There have issue currently",
        },
    ];
    return {
        status_code: http_status_1.default.FORBIDDEN,
        message: (_b = err === null || err === void 0 ? void 0 : err.message) !== null && _b !== void 0 ? _b : "Cast error; Invalid id ",
        errorMessages: all_errors,
    };
};
exports.handleKnownError = handleKnownError;

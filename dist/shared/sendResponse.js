"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    var _a, _b, _c;
    let response_obj = (data === null || data === void 0 ? void 0 : data.token)
        ? {
            success: data.success,
            message: (_a = data.message) !== null && _a !== void 0 ? _a : "",
            statusCode: data.status_code,
            meta: data.meta || undefined,
            token: data.token || undefined,
        }
        : {
            success: data.success,
            message: (_b = data.message) !== null && _b !== void 0 ? _b : "",
            statusCode: data.status_code,
            meta: data.meta || undefined,
            data: (_c = data.data) !== null && _c !== void 0 ? _c : null,
        };
    res.status(data.status_code).json(response_obj);
};
exports.default = sendResponse;

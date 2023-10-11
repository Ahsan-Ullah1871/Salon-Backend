"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandleValidationError_1 = require("../errors/HandleValidationError");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const zod_1 = require("zod");
const HandleZodValidationError_1 = __importDefault(require("../errors/HandleZodValidationError"));
const HandleCastError_1 = require("../errors/HandleCastError");
const client_1 = require("@prisma/client");
const global_error_handler = (error, req, res, next) => {
    let status_code = 500;
    let message = "Something went wrong";
    let errorMessages = [];
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        const validation_error = (0, HandleValidationError_1.handleValidationError)(error);
        status_code = validation_error.status_code;
        message = validation_error.message;
        errorMessages = validation_error.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const z_validation_error = (0, HandleZodValidationError_1.default)(error);
        status_code = z_validation_error.status_code;
        message = z_validation_error.message;
        errorMessages = z_validation_error.errorMessages;
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const cast_error = (0, HandleCastError_1.handleKnownError)(error);
        status_code = cast_error.status_code;
        message = cast_error.message;
        errorMessages = cast_error.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        status_code = error.statusCode;
        message = "Api Connection error";
        errorMessages = error.message
            ? [{ path: "", message: error.message }]
            : [];
    }
    else if (error instanceof Error) {
        message = "Internal error";
        errorMessages = error.message
            ? [{ path: "", message: error.message }]
            : [];
    }
    res.status(status_code).json({
        success: false,
        message,
        errorMessages,
        stack: error === null || error === void 0 ? void 0 : error.stack, //config?.node_env === 'development' ? error?.stack : undefined,
    });
};
exports.default = global_error_handler;

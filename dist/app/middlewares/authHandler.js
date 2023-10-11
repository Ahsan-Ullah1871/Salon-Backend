"use strict";
/* eslint-disable no-unused-expressions */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../config"));
// requestValidationHandler
const authHandler = (...selected_roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //   check authorization
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized");
        }
        const decoded_user = jwtHelper_1.jwtHelper.verify_token(token, config_1.default.jwt.access_token_secret);
        const { userId, email, role } = decoded_user;
        console.log(userId, email, role);
        // set in req
        req.logged_in_user = decoded_user;
        //   check if the user is authenticated
        if (!userId) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized");
        }
        //  check if the user has the required role
        if (!selected_roles.includes(role)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "forbidden");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = authHandler;

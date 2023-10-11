"use strict";
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
exports.AuthServices = void 0;
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// import { IUserLogin } from "../user/user.interface";
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
// Create new user
const user_signup = (user_data) => __awaiter(void 0, void 0, void 0, function* () {
    const created_user = yield prisma_1.default.user.create({
        data: user_data,
    });
    const userWithoutPassword = created_user;
    delete userWithoutPassword.password;
    return userWithoutPassword;
});
// login user
const user_login = (user_data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: user_data.email,
            password: user_data.password,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "User not found, check your email and password");
    }
    // access token
    const token = jwtHelper_1.jwtHelper.create_token({
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    }, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expiresIn);
    return { token };
});
exports.AuthServices = {
    user_signup,
    user_login,
};

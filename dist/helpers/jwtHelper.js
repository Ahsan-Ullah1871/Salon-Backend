"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// create jwt token
const create_token = (payload_data, secret_key, expire_time) => {
    return jsonwebtoken_1.default.sign(payload_data, secret_key, { expiresIn: expire_time });
};
// verify the token
const verify_token = (token, secret_key) => {
    return jsonwebtoken_1.default.verify(token, secret_key);
};
exports.jwtHelper = {
    create_token,
    verify_token,
};

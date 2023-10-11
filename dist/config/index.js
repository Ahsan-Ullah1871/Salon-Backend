"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// dotenv.config({
// 	path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
// });
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env.dev") });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_user_password: process.env.DEFAULT_USER_PASSWORD,
    default_student_password: process.env.DEFAULT_USER_PASSWORD,
    default_faculty_password: process.env.DEFAULT_USER_PASSWORD,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        access_token_expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        refresh_token_expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
    cloudinary: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.APIKEY,
        apiSecret: process.env.APISECRET,
    },
};

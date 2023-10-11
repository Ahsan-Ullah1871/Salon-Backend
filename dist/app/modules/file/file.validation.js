"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_signin_zod_schema = exports.user_signup_zod_schema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.user_signup_zod_schema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email address is required" }),
        password: zod_1.z.string({ required_error: "Password  is required" }),
        role: zod_1.z.enum([...Object.values(client_1.UserRole)], {
            required_error: "role  is required",
        }),
        contactNo: zod_1.z.string({
            required_error: "Contact no  is required",
        }),
        address: zod_1.z.string({ required_error: "address  is required" }),
        profileImg: zod_1.z.string({
            required_error: "profile image  is required",
        }),
    }),
});
exports.user_signin_zod_schema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email address is required" }),
        password: zod_1.z.string({ required_error: "Password  is required" }),
    }),
});

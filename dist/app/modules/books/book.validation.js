"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_book_zod_schema = exports.create_book_zod_schema = void 0;
const zod_1 = require("zod");
exports.create_book_zod_schema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }),
        author: zod_1.z.string({ required_error: "Author is required" }),
        genre: zod_1.z.string({ required_error: "Genre is required" }),
        price: zod_1.z.number({ required_error: "Price is required" }),
        publicationDate: zod_1.z.string({
            required_error: "Publication Date is required",
        }),
        categoryId: zod_1.z.string({
            required_error: "categoryId   is required",
        }),
    }),
});
exports.update_book_zod_schema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: "Title is required" })
            .optional(),
        author: zod_1.z
            .string({ required_error: "Author is required" })
            .optional(),
        genre: zod_1.z
            .string({ required_error: "Genre is required" })
            .optional(),
        price: zod_1.z
            .number({ required_error: "Price is required" })
            .optional(),
        publication_date: zod_1.z
            .string({
            required_error: "Publication Date is required",
        })
            .optional(),
        categoryId: zod_1.z
            .string({
            required_error: "categoryId   is required",
        })
            .optional(),
    }),
});

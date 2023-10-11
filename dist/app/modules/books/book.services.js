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
exports.BookServices = void 0;
const pagination_1 = require("../../../helpers/pagination");
const book_condition_1 = require("./book.condition");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create new book
const create_new_book = (book_data) => __awaiter(void 0, void 0, void 0, function* () {
    const isCtExist = yield prisma_1.default.category.findUnique({
        where: { id: book_data.categoryId },
    });
    if (isCtExist === null) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Category not found ");
    }
    const created_book = yield prisma_1.default.book.create({
        data: book_data,
        include: { category: true },
    });
    return created_book;
});
//  gel_all_books
const gel_all_books = (filers, pagination_data) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip, sortObject } = (0, pagination_1.pagination_map)(pagination_data, "title");
    // and conditions (for search and filter)
    const whereConditions = (0, book_condition_1.GetWhereConditions)(filers);
    //
    const all_books = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: sortObject,
    });
    const total = yield prisma_1.default.book.count();
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page: Number(page),
            size: Number(size),
            total: total,
            totalPage,
        },
        data: all_books,
    };
});
//  Books By CategoryId
const gel_books_by_category_id = (ct_id, pagination_data) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip, sortObject } = (0, pagination_1.pagination_map)(pagination_data, "title");
    //
    const all_books = yield prisma_1.default.book.findMany({
        where: { categoryId: ct_id },
        skip,
        take: size,
        orderBy: sortObject,
    });
    const total = yield prisma_1.default.book.count({ where: { categoryId: ct_id } });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page: Number(page),
            size: Number(size),
            total: total,
            totalPage,
        },
        data: all_books,
    };
});
//book detail
const get_book_details = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    return isExist;
});
// Update book
const update_book = (book_data, book_id) => __awaiter(void 0, void 0, void 0, function* () {
    // book   checking
    const isExist = yield prisma_1.default.book.findUnique({ where: { id: book_id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    //
    const updated_book_data = yield prisma_1.default.book.update({
        where: { id: book_id },
        data: book_data,
    });
    if (!updated_book_data) {
        throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, "Failed to update book data");
    }
    return updated_book_data;
});
//  Delete book
const delete_book = (book_id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findUnique({ where: { id: book_id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    const book = yield prisma_1.default.book.delete({ where: { id: book_id } });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, "Failed to delete book");
    }
    return book;
});
exports.BookServices = {
    create_new_book,
    update_book,
    gel_all_books,
    get_book_details,
    delete_book,
    gel_books_by_category_id,
};

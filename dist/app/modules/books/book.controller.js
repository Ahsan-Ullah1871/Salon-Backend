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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_services_1 = require("./book.services");
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constant_1 = require("./book.constant");
const common_1 = require("../../../constant/common");
// Create Book
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book_data = __rest(req.body, []);
    const result = yield book_services_1.BookServices.create_new_book(book_data);
    (0, sendResponse_1.default)(res, {
        status_code: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Book created successfully",
    });
}));
//  updateBook
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: book_id } = req.params;
    const book_data = __rest(req.body, []);
    const result = yield book_services_1.BookServices.update_book(book_data, book_id);
    (0, sendResponse_1.default)(res, {
        status_code: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Book updated successfully",
    });
}));
//  Get all books
const allBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filers = (0, pick_1.default)(req.query, book_constant_1.book_filter_keys);
    const pagination = (0, pick_1.default)(req.query, common_1.pagination_keys);
    const result = yield book_services_1.BookServices.gel_all_books(filers, pagination);
    (0, sendResponse_1.default)(res, {
        status_code: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Books retrieved successfully",
    });
}));
//
const cateGoryBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryID } = req.params;
    const pagination = (0, pick_1.default)(req.query, common_1.pagination_keys);
    const result = yield book_services_1.BookServices.gel_books_by_category_id(categoryID, pagination);
    (0, sendResponse_1.default)(res, {
        status_code: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Category Books retrieved successfully",
    });
}));
//   Get   Book Details
const bookDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_services_1.BookServices.get_book_details(id);
    (0, sendResponse_1.default)(res, {
        status_code: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Book details retrieved successfully",
    });
}));
//  Delete   Book
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: book_id } = req.params;
    const result = yield book_services_1.BookServices.delete_book(book_id);
    (0, sendResponse_1.default)(res, {
        status_code: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Book deleted successfully",
    });
}));
exports.BookController = {
    createBook,
    bookDetails,
    updateBook,
    deleteBook,
    allBooks,
    cateGoryBooks,
};

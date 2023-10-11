"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination_map = void 0;
const pagination_map = (pagination_data, default_sort_by) => {
    const page = pagination_data.page ? Number(pagination_data.page) : 1;
    const size = pagination_data.size ? Number(pagination_data.size) : 5;
    const skip = (page - 1) * size;
    const sortBy = pagination_data.sortBy || default_sort_by;
    const sortOrder = pagination_data.sortOrder || "desc";
    const sortObject = { [sortBy]: sortOrder };
    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
        sortObject,
    };
};
exports.pagination_map = pagination_map;

import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { Category, Prisma, User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { JwtPayload } from "jsonwebtoken";
import { hashingHelper } from "../../../helpers/hashingHelper";
import { ICategoryFilter } from "./category.interface";
import { IPagination } from "../../../interfaces/pagination";
import { pagination_map } from "../../../helpers/pagination";
import { GetWhereConditions } from "./category.condition";
import { GenericResponse } from "../../../interfaces/common";

//* categoryList
const categories_list = async (
	filers: ICategoryFilter,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<Category[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.CategoryWhereInput =
		GetWhereConditions(filers);

	//
	const all_service = await prisma.category.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
	});
	const total = await prisma.category.count({
		where: whereConditions,
	});
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_service,
	};
};

// * category_details
const category_details = async (id: string): Promise<Category | null> => {
	const ct_details = await prisma.category.findUnique({
		where: {
			id,
		},
		include: {
			services: true,
		},
	});
	return ct_details;
};

//* Category upload
const category_upload = async (ct_data: Category): Promise<Category | null> => {
	const ct = await prisma.category.create({
		data: ct_data,
	});

	return ct;
};

//* Category  update
const category_update = async (
	id: string,
	ct_data: Partial<Category>
): Promise<Category | null> => {
	//  user details from server
	const category_details_from_server = await prisma.category.findUnique({
		where: {
			id,
		},
	});

	// if user is not found
	if (!category_details_from_server) {
		throw new ApiError(httpStatus.FORBIDDEN, "Category not found ");
	}

	// update category
	const ct = await prisma.category.update({
		where: {
			id,
		},
		data: ct_data,
	});

	return ct;
};

//* Category  delete
const category_delete = async (id: string): Promise<Category | null> => {
	//  user details from server
	const category_details_from_server = await prisma.category.findUnique({
		where: {
			id,
		},
	});

	// if user is not found
	if (!category_details_from_server) {
		throw new ApiError(httpStatus.FORBIDDEN, "Category not found");
	}

	// services list
	const services_list = await prisma.service.findMany({
		where: {
			category_id: id,
		},
	});

	if (services_list?.length > 0) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"Category cannot be deleted as it has services"
		);
	}

	const ct = await prisma.category.delete({
		where: {
			id,
		},
	});

	return ct;
};

export const CategoryServices = {
	category_details,
	categories_list,
	category_delete,
	category_update,
	category_upload,
};


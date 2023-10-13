import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { Category, User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { JwtPayload } from "jsonwebtoken";
import { hashingHelper } from "../../../helpers/hashingHelper";

//* categoryList
const categories_list = async (): Promise<Partial<Category>[] | null> => {
	const categories = await prisma.category.findMany({});
	return categories;
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


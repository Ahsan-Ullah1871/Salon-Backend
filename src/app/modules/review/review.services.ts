import { pagination_map } from "../../../helpers/pagination";
import { GenericResponse } from "../../../interfaces/common";
import { IPagination } from "../../../interfaces/pagination";
import { GetWhereConditions } from "./review.condition";
import ApiError from "../../errors/ApiError";

import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Prisma, Review } from "@prisma/client";
import { IReviewFilter } from "./review.interface";

//* Create new review
const create_new_review = async (
	review_data: Review
): Promise<Review | null> => {
	// user checking
	const isExist = await prisma.user.findUnique({
		where: { id: review_data.user_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}

	// service checking
	const isExist_service = await prisma.service.findUnique({
		where: { id: review_data.service_id },
	});

	if (!isExist_service) {
		throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
	}

	//
	const created_review_data = await prisma.review.create({
		data: review_data,
	});

	return created_review_data;
};

//* gel_all_ review
const get_all_reviews = async (
	filers: IReviewFilter,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<Review[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.ReviewWhereInput =
		GetWhereConditions(filers);

	//
	const all_review = await prisma.review.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
	});
	const total = await prisma.review.count({ where: whereConditions });
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_review,
	};
};

//* review  details
const get_review_details = async (id: string): Promise<Review | null> => {
	const isExist = await prisma.review.findUnique({ where: { id } });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "review not found");
	}

	return isExist;
};

//* review  updating
const review_update = async (
	review_data: Partial<Review>,
	review_id: string
): Promise<Review | null> => {
	// review   checking

	const isExist = await prisma.review.findUnique({
		where: { id: review_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "review not found");
	}

	// user checking
	const isUserExist = await prisma.user.findUnique({
		where: { id: review_data.user_id },
	});

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}

	// service checking
	const isExist_service = await prisma.service.findUnique({
		where: { id: review_data.service_id },
	});

	if (!isExist_service) {
		throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
	}

	//
	const updated_review_data = await prisma.review.update({
		where: { id: review_id },
		data: review_data,
	});

	if (!updated_review_data) {
		throw new ApiError(
			httpStatus.EXPECTATION_FAILED,
			"Failed to update review data"
		);
	}

	return updated_review_data;
};

// * delete_review
const delete_review = async (review_id: string): Promise<Review | null> => {
	// review checking function
	const isExist = await prisma.review.findUnique({
		where: { id: review_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "review not found");
	}

	// delete review
	const deleted_review_data = await prisma.review.delete({
		where: {
			id: review_id,
		},
	});

	return deleted_review_data;
};

export const ReviewServices = {
	create_new_review,
	review_update,
	get_all_reviews,
	get_review_details,
	delete_review,
};


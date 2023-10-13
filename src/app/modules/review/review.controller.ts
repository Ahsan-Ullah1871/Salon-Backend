import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { review_filter_keys } from "./review.constant";
import { pagination_keys } from "../../../constant/common";
import { ReviewServices } from "./review.services";

// *createReview
const createReview = catchAsync(async (req: Request, res: Response) => {
	const { ...review_data } = req.body;

	const result = await ReviewServices.create_new_review(review_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "review created successfully",
	});
});

//*  updateRreview
const updateReview = catchAsync(async (req: Request, res: Response) => {
	const { id: review_id } = req.params;

	const { ...review_data } = req.body;
	const result = await ReviewServices.review_update(
		review_data,
		review_id
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "review updated successfully",
	});
});

//*  Get all reviews
const allReviews = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, review_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	const result = await ReviewServices.get_all_reviews(filers, pagination);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "reviews retrieved successfully",
	});
});

//  reviewDetails
const reviewDetails = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await ReviewServices.get_review_details(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "review details retrieved successfully",
	});
});

// deletereview
const deleteReview = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await ReviewServices.delete_review(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "review deleted successfully",
	});
});

export const reviewController = {
	createReview,
	reviewDetails,
	updateReview,
	deleteReview,
	allReviews,
};


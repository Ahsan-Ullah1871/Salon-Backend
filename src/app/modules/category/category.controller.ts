import { Request, Response } from "express";
import httpStatus from "http-status";
import { CategoryServices } from "./category.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { service_filter_keys } from "./catgory.constant";
import { pagination_keys } from "../../../constant/common";

//*  Get  categoryList
const categoryList = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, service_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	const result = await CategoryServices.categories_list(
		filers,
		pagination
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Categories's list  retrieved successfully",
	});
});

//*  Get   categoryDetails information
const categoryDetails = catchAsync(async (req: Request, res: Response) => {
	const { id: ct_id } = req.params;

	const result = await CategoryServices.category_details(ct_id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Category information retrieved successfully",
	});
});

//*  categoryUpload
const categoryUpload = catchAsync(async (req: Request, res: Response) => {
	const { ...ct_data } = req.body;

	const result = await CategoryServices.category_upload(ct_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Category uploaded successfully",
	});
});
//*  Update  category
const categoryUpdate = catchAsync(async (req: Request, res: Response) => {
	const { id: ct_id } = req.params;
	const { ...ct_data } = req.body;

	const result = await CategoryServices.category_update(ct_id, ct_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Category updated successfully",
	});
});

// * Delete user profile information
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await CategoryServices.category_delete(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Category  deleted successfully",
	});
});

export const CategoryController = {
	categoryDetails,
	categoryList,
	categoryUpload,
	categoryUpdate,
	deleteCategory,
};


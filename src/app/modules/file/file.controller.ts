import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { FileServices } from "./file.services";
import { User, UserRole } from "@prisma/client";
import pick from "../../../shared/pick";
import { file_filter_keys } from "./file.constatnt";
import { pagination_keys } from "../../../constant/common";

// fileUpload
const fileUpload = catchAsync(async (req: Request, res: Response) => {
	const result = await FileServices.file_upload(req);
	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "File uploaded successfully",
	});
});

// All files
const allFiles = catchAsync(async (req: Request, res: Response) => {
	const user_data = req.logged_in_user;
	const filers = pick(req.query, file_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	// checking user id in filter
	if (
		!filers.user_id &&
		(user_data.role !== UserRole.admin ||
			user_data.role !== UserRole.super_admin)
	) {
		filers.user_id = user_data.user_id;
	}

	const result = await FileServices.get_all_files(
		user_data,
		pagination,
		filers
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Files retrieved successfully",
	});
});

export const FileController = {
	fileUpload,
	allFiles,
};


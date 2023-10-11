import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { FileServices } from "./file.services";
import { User } from "@prisma/client";

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

export const FileController = {
	fileUpload,
};


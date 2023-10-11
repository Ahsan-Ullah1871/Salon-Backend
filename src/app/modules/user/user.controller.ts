import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

//  Get   user profile information
const usersList = catchAsync(async (req: Request, res: Response) => {
	const { _id: user_id } = req.logged_in_user;

	const result = await UserServices.users_list();

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's information retrieved successfully",
	});
});
//  Get   user profile information
const userDetails = catchAsync(async (req: Request, res: Response) => {
	const { id: user_id } = req.params;

	const result = await UserServices.users_details(user_id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's information retrieved successfully",
	});
});
//  Get   users_profile
const userProfile = catchAsync(async (req: Request, res: Response) => {
	const user_data = req.logged_in_user;

	const result = await UserServices.users_profile(user_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's information retrieved successfully",
	});
});
//  Get   user profile information
const userUpdate = catchAsync(async (req: Request, res: Response) => {
	const { id: user_id } = req.params;
	const { ...user_data } = req.body;

	const result = await UserServices.users_update(user_id, user_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's updated successfully",
	});
});

//  Get   user profile information
const deleteUser = catchAsync(async (req: Request, res: Response) => {
	const { id: user_id } = req.params;

	const result = await UserServices.users_delete(user_id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's deleted successfully",
	});
});

export const UserController = {
	userDetails,
	usersList,
	userUpdate,
	deleteUser,
	userProfile,
};


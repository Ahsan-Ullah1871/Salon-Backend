import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { user_filter_keys } from "./user.constant";
import { pagination_keys } from "../../../constant/common";

//*  Get   user list
const usersList = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, user_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	const result = await UserServices.users_list(filers, pagination);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's list  retrieved successfully",
	});
});

//*  Get   user profile information
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

//*  Get   users_profile
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

//*  Update   user profile
const userUpdate = catchAsync(async (req: Request, res: Response) => {
	const { id: user_id } = req.params;
	const { ...user_data } = req.body;
	const logged_in_user = req.logged_in_user;

	const result = await UserServices.users_update(
		user_id,
		user_data,
		logged_in_user
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's updated successfully",
	});
});

//*  Update   user profile
const editProfile = catchAsync(async (req: Request, res: Response) => {
	const { id: user_id } = req.params;
	const { ...user_data } = req.body;
	const logged_in_user = req.logged_in_user;

	const result = await UserServices.edit_profile(
		user_id,
		user_data,
		logged_in_user
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User's updated successfully",
	});
});

// * Delete user profile information
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
	editProfile,
};


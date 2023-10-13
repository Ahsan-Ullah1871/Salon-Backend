import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { schedule_filter_keys } from "./schedule.constant";
import { pagination_keys } from "../../../constant/common";
import { scheduleServices } from "./schedule.services";

// *createSchedule
const createSchedule = catchAsync(async (req: Request, res: Response) => {
	const { ...schedule__data } = req.body;

	const result = await scheduleServices.create_new_schedule(
		schedule__data
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "schedule created successfully",
	});
});

//*  updateSchedule
const updateSchedule = catchAsync(async (req: Request, res: Response) => {
	const { id: schedule_id } = req.params;

	const { ...schedule_full_data } = req.body;
	const result = await scheduleServices.schedule_update(
		schedule_full_data,
		schedule_id
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "schedule updated successfully",
	});
});

//*  Get all schedules
const allSchedules = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, schedule_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	const result = await scheduleServices.get_all_schedules(
		filers,
		pagination
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "schedules retrieved successfully",
	});
});

//  scheduleDetails
const scheduleDetails = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await scheduleServices.get_schedule_details(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "schedule details retrieved successfully",
	});
});

// deleteschedule
const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await scheduleServices.delete_schedule(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "schedule deleted successfully",
	});
});

export const scheduleController = {
	createSchedule,
	scheduleDetails,
	updateSchedule,
	deleteSchedule,
	allSchedules,
};


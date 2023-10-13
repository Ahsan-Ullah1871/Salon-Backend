import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { worker_filter_keys } from "./worker.constant";
import { pagination_keys } from "../../../constant/common";
import { workerServices } from "./worker.services";

// *createWorker
const createWorker = catchAsync(async (req: Request, res: Response) => {
	const { ...worker_full_data } = req.body;

	const result = await workerServices.create_new_worker(worker_full_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "worker created successfully",
	});
});

//*  updateworker
const updateWorker = catchAsync(async (req: Request, res: Response) => {
	const { id: worker_id } = req.params;

	const { ...worker_full_data } = req.body;
	const result = await workerServices.worker_update(
		worker_full_data,
		worker_id
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "worker updated successfully",
	});
});

//*  Get all workers
const allWorkers = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, worker_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	const result = await workerServices.get_all_workers(filers, pagination);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "workers retrieved successfully",
	});
});

//  workerDetails
const workerDetails = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await workerServices.get_worker_details(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "worker details retrieved successfully",
	});
});

// deleteworker
const deleteWorker = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await workerServices.delete_worker(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "worker deleted successfully",
	});
});

export const workerController = {
	createWorker,
	workerDetails,
	updateWorker,
	deleteWorker,
	allWorkers,
};


import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { service_filter_keys } from "./service.constant";
import { pagination_keys } from "../../../constant/common";
import { ServiceListingServices } from "./service.services";

// *createService
const createService = catchAsync(async (req: Request, res: Response) => {
	const { ...service_data } = req.body;

	const result = await ServiceListingServices.create_new_service(
		service_data
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Service created successfully",
	});
});

//*  updateService
const updateService = catchAsync(async (req: Request, res: Response) => {
	const { id: service_id } = req.params;

	const { ...service_data } = req.body;
	const result = await ServiceListingServices.service_update(
		service_data,
		service_id
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Service updated successfully",
	});
});

//*  Get all services
const allServices = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, service_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	const result = await ServiceListingServices.get_all_service(
		filers,
		pagination
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Services retrieved successfully",
	});
});

//* cateGoryServices
const cateGoryServices = catchAsync(async (req: Request, res: Response) => {
	const { categoryID } = req.params;
	const pagination = pick(req.query, pagination_keys);

	const result = await ServiceListingServices.get_service_by_category_id(
		categoryID,
		pagination
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Category Services retrieved successfully",
	});
});

//  serviceDetails
const serviceDetails = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await ServiceListingServices.get_service_details(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Service details retrieved successfully",
	});
});

// deleteService
const deleteService = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await ServiceListingServices.delete_service(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Service deleted successfully",
	});
});

export const ServiceController = {
	createService,
	serviceDetails,
	updateService,
	deleteService,
	allServices,
	cateGoryServices,
};


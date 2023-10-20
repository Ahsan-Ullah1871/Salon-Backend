import { pagination_map } from "../../../helpers/pagination";
import { GenericResponse } from "../../../interfaces/common";
import { IPagination } from "../../../interfaces/pagination";
import { GetWhereConditions } from "./service.condition";
import ApiError from "../../errors/ApiError";

import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { IServiceFilter } from "./service.interface";
import { Prisma, Service } from "@prisma/client";
import { DateISOConverter } from "../../../constant/DateStriingCOnverter";

const today = new Date();

//* Create new service
const create_new_service = async (
	service_data: Service
): Promise<Service | null> => {
	const isCtExist = await prisma.category.findUnique({
		where: { id: service_data.category_id },
	});

	if (isCtExist === null) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Category not found ");
	}

	const created_service = await prisma.service.create({
		data: service_data,
		include: { category: true },
	});

	return created_service;
};

//* gel_all_ service
const get_all_service = async (
	filers: IServiceFilter,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<Service[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.ServiceWhereInput =
		GetWhereConditions(filers);

	//
	const all_service = await prisma.service.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
		include: {
			schedules: {
				where: {
					date: DateISOConverter(today),
				},
			},
		},
	});
	const total = await prisma.service.count({
		where: whereConditions,
	});
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_service,
	};
};

// * Services By CategoryId
const get_service_by_category_id = async (
	ct_id: string,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<Service[]> | null> => {
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	//
	const all_services = await prisma.service.findMany({
		where: { category_id: ct_id },
		skip,
		take: size,
		orderBy: sortObject,
	});
	const total = await prisma.service.count({
		where: { category_id: ct_id },
	});
	const totalPage = Math.ceil(total / size);
	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_services,
	};
};

//* Service  details
const get_service_details = async (id: string): Promise<Service | null> => {
	const isExist = await prisma.service.findUnique({ where: { id } });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
	}

	return isExist;
};

//* service  updating
const service_update = async (
	service_data: Partial<Service>,
	service_id: string
): Promise<Service | null> => {
	// service   checking

	const isExist = await prisma.service.findUnique({
		where: { id: service_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
	}

	//  category checking
	if (service_data.category_id) {
		const isCtExist = await prisma.category.findUnique({
			where: { id: service_data.category_id },
		});

		if (isCtExist === null) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"Category not found "
			);
		}
	}

	//
	const updated_service_data = await prisma.service.update({
		where: { id: service_id },
		data: service_data,
	});

	if (!updated_service_data) {
		throw new ApiError(
			httpStatus.EXPECTATION_FAILED,
			"Failed to update service data"
		);
	}

	return updated_service_data;
};

// * delete_service
const delete_service = async (service_id: string): Promise<Service | null> => {
	// service checking function
	const isExist = await prisma.service.findUnique({
		where: { id: service_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "Service not found");
	}

	// user_appointments_list
	const user_appointments_list = await prisma.appointment.findMany({
		where: {
			service_id: service_id,
		},
	});

	// schedules
	const schedules = await prisma.schedule.findMany({
		where: {
			service_id: service_id,
		},
	});

	// reviews
	const reviews = await prisma.review.findMany({
		where: {
			service_id: service_id,
		},
	});

	const delete_service = await prisma.$transaction(async (transaction) => {
		// delete appointments
		if (user_appointments_list?.length > 0) {
			const appointments =
				await transaction.appointment.deleteMany({
					where: {
						service_id: service_id,
					},
				});
		}

		// delete reviews
		if (reviews?.length > 0) {
			const delete_reviews = await transaction.review.deleteMany(
				{
					where: {
						service_id,
					},
				}
			);
		}

		// delete schedules
		if (schedules?.length > 0) {
			const delete_schedules =
				await transaction.schedule.deleteMany({
					where: {
						service_id,
					},
				});
		}

		// delete service
		const deleted_service_data = await transaction.service.delete({
			where: {
				id: service_id,
			},
		});

		return deleted_service_data;
	});

	if (delete_service) {
		return delete_service;
	}

	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to delete service");
};

export const ServiceListingServices = {
	create_new_service,
	service_update,
	get_all_service,
	get_service_details,
	delete_service,
	get_service_by_category_id,
};


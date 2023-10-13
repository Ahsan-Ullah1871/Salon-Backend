import { pagination_map } from "../../../helpers/pagination";
import { GenericResponse } from "../../../interfaces/common";
import { IPagination } from "../../../interfaces/pagination";
import { GetWhereConditions } from "./schedule.condition";
import ApiError from "../../errors/ApiError";

import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Prisma, Schedule } from "@prisma/client";
import { IScheduleFilter } from "./schedule.interface";

//* Create new schedule
const create_new_schedule = async (
	schedule_data: Schedule
): Promise<Schedule | null> => {
	// service checking
	const service = await prisma.service.findUnique({
		where: {
			id: schedule_data.service_id,
		},
	});

	if (!service) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Service not found");
	}

	// provider checking
	const provider = await prisma.worker.findUnique({
		where: {
			id: schedule_data.provider_id,
		},
	});

	if (!provider) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Worker not found");
	}

	// schedule creation
	const new_schedule = await prisma.schedule.create({
		data: schedule_data,
	});

	return new_schedule;
};

//* gel_all_ schedule
const get_all_schedules = async (
	filers: IScheduleFilter,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<Schedule[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.ScheduleWhereInput =
		GetWhereConditions(filers);

	//
	const all_schedule = await prisma.schedule.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
	});
	const total = await prisma.schedule.count();
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_schedule,
	};
};

//* schedule  details
const get_schedule_details = async (id: string): Promise<Schedule | null> => {
	const isExist = await prisma.schedule.findUnique({
		where: { id },
		include: { service: true, worker: true },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "schedule not found");
	}

	return isExist;
};

//* schedule  updating
const schedule_update = async (
	schedule_data: Partial<Schedule>,
	schedule_id: string
): Promise<Schedule | null> => {
	// schedule   checking
	const isExist = await prisma.schedule.findUnique({
		where: { id: schedule_id },
	});
	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "schedule not found");
	}
	// service checking
	const service = await prisma.service.findUnique({
		where: {
			id: schedule_data.service_id,
		},
	});

	if (!service) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Service not found");
	}

	// provider checking
	const provider = await prisma.worker.findUnique({
		where: {
			id: schedule_data.provider_id,
		},
	});
	if (!provider) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Provider not found");
	}
	// schedule updating
	const updated_schedule = await prisma.schedule.update({
		where: { id: schedule_id },
		data: schedule_data,
	});

	return updated_schedule;
};

// * delete_schedule
const delete_schedule = async (
	schedule_id: string
): Promise<Schedule | null> => {
	// schedule checking function
	const isExist = await prisma.schedule.findUnique({
		where: { id: schedule_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "schedule not found");
	}

	// appointments of schedule
	const appointments_of_schedule = await prisma.appointment.findMany({
		where: { schedule_id: schedule_id },
	});

	if (appointments_of_schedule.length > 0) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"Schedule has appointments"
		);
	}

	// schedule deleting
	const deleted_schedule = await prisma.schedule.delete({
		where: { id: schedule_id },
	});

	return deleted_schedule;
};

export const scheduleServices = {
	create_new_schedule,
	schedule_update,
	get_all_schedules,
	get_schedule_details,
	delete_schedule,
};


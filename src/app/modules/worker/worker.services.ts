import { pagination_map } from "../../../helpers/pagination";
import { GenericResponse } from "../../../interfaces/common";
import { IPagination } from "../../../interfaces/pagination";
import { GetWhereConditions } from "./worker.condition";
import ApiError from "../../errors/ApiError";

import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Prisma, UserRole, Worker } from "@prisma/client";
import { IWorkerDataWithCV, IWorkerFilter } from "./worker.interface";

//* Create new worker
const create_new_worker = async (
	worker_full_data: IWorkerDataWithCV
): Promise<Worker | null> => {
	const { worker_data, cv_data } = worker_full_data;
	// user checking
	const isExist = await prisma.user.findUnique({
		where: { id: worker_data.user_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}
	if (isExist?.role == UserRole.worker) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			"Already he is from the worker"
		);
	}

	//  checking working history

	const newWorker = await prisma.worker.create({
		data: {
			...worker_data,
			// worker_history: {
			// 	create: cv_data,
			// },
		},
		include: {
			user: {
				select: {
					id: true,
					role: true,
					profile_image: true,
				},
			},
		},
	});

	return newWorker;
};

//* gel_all_ worker
const get_all_workers = async (
	filers: IWorkerFilter,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<Worker[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.WorkerWhereInput =
		GetWhereConditions(filers);

	//
	const all_worker = await prisma.worker.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
		include: {
			user: {
				select: {
					id: true,
					role: true,
					profile_image: true,
				},
			},
		},
	});
	const total = await prisma.worker.count({ where: whereConditions });
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_worker,
	};
};

//* worker  details
const get_worker_details = async (id: string): Promise<Worker | null> => {
	const isExist = await prisma.worker.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					id: true,
					role: true,
					profile_image: true,
				},
			},
		},
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "worker not found");
	}

	return isExist;
};

//* worker  updating
const worker_update = async (
	worker_full_data: Partial<IWorkerDataWithCV>,
	worker_id: string
): Promise<Worker | null> => {
	const { worker_data, cv_data } = worker_full_data;
	// worker   checking
	const isExist = await prisma.worker.findUnique({
		where: { id: worker_id },
	});
	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "worker not found");
	}

	// user checking
	const isUserExist = await prisma.user.findUnique({
		where: { id: worker_data?.user_id },
	});

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}

	//
	const update_worker = await prisma.$transaction(async (transaction) => {
		// // delete appointments
		// if (cv_data) {
		// 	const cv_update = await transaction.cV.updateMany({
		// 		where: {
		// 			worker_id: isExist.id,
		// 		},
		// 		data: cv_data,
		// 	});
		// }

		// update worker
		if (worker_data) {
			const worker = await transaction.worker.update({
				where: { id: worker_id },
				data: worker_data,
			});
		}

		// fetch updated worker a
		const updated_worker = await transaction.worker.findUnique({
			where: { id: worker_id },
			include: { worker_history: true },
		});

		return updated_worker;
	});

	if (update_worker) {
		return update_worker;
	}

	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to update worker");
};

// * delete_worker
const delete_worker = async (worker_id: string): Promise<Worker | null> => {
	// worker checking function
	const isExist = await prisma.worker.findUnique({
		where: { id: worker_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "worker not found");
	}

	//  find cv workers
	const cv_of_worker = await prisma.cV.findMany({
		where: { worker_id: worker_id },
	});

	// schedules of worker
	const schedules_of_worker = await prisma.schedule.findMany({
		where: { provider_id: worker_id },
	});
	if (schedules_of_worker?.length > 0) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You can't delete this worker because it has schedules"
		);
	}

	// delete worker
	const deleted_worker = await prisma.worker.delete({
		where: { id: worker_id },
	});

	// delete cv
	if (cv_of_worker) {
		await prisma.cV.deleteMany({
			where: { worker_id: worker_id },
		});
	}

	return deleted_worker;
};

export const workerServices = {
	create_new_worker,
	worker_update,
	get_all_workers,
	get_worker_details,
	delete_worker,
};


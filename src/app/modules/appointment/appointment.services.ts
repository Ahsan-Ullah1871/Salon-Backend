import { pagination_map } from "../../../helpers/pagination";
import { GenericResponse } from "../../../interfaces/common";
import { IPagination } from "../../../interfaces/pagination";
import { GetWhereConditions } from "./appointment.condition";
import ApiError from "../../errors/ApiError";

import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Appointment, Prisma, UserRole } from "@prisma/client";
import { IAppointmentFilter } from "./appointment.interface";

//* Create new appointment
const create_new_appointment = async (
	appointment_data: Appointment
): Promise<Appointment | null> => {
	// service checking
	const service = await prisma.service.findUnique({
		where: {
			id: appointment_data.service_id,
		},
	});

	if (!service) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Service not found");
	}

	// schedule  checking
	const schedule = await prisma.schedule.findUnique({
		where: {
			id: appointment_data.schedule_id,
		},
	});
	if (!schedule) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Schedule not found");
	}
	if (!schedule.available) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"This schedule not available now"
		);
	}

	//
	const new_appointment = await prisma.$transaction(
		async (transaction) => {
			// delete feedbacks
			if (schedule) {
				const update_schedule =
					await transaction.schedule.update({
						where: {
							id: schedule.id,
						},
						data: {
							available: false,
						},
					});
			}

			//
			const appointment = await transaction.appointment.create({
				data: appointment_data,
			});

			return appointment;
		}
	);

	if (new_appointment) {
		return new_appointment;
	}

	throw new ApiError(
		httpStatus.BAD_REQUEST,
		"Unable to book an appointment"
	);
};

//* gel_all_ appointment
const get_all_appointments = async (
	filers: IAppointmentFilter,
	pagination_data: Partial<IPagination>,
	current_user: JwtPayload
): Promise<GenericResponse<Appointment[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// filter keys updating base on user
	if (current_user?.role === UserRole.customer) {
		filers.user_id = current_user.user_id;
	}

	// and conditions (for search and filter)
	const whereConditions: Prisma.AppointmentWhereInput =
		GetWhereConditions(filers);

	//
	const all_appointment = await prisma.appointment.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					phone_number: true,
				},
			},
			service: true,
			schedule: {
				include: {
					worker: true,
				},
			},
		},
	});
	const total = await prisma.appointment.count({ where: whereConditions });
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_appointment,
	};
};

//* gel all appointment by worker
const get_all_appointments_by_worker = async (
	filers: IAppointmentFilter,
	pagination_data: Partial<IPagination>,
	current_user: JwtPayload
): Promise<GenericResponse<Appointment[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.AppointmentWhereInput = {
		AND: {
			...GetWhereConditions(filers).AND,
			schedule: {
				worker: current_user.user_id,
			},
		},
	};

	//
	const all_appointment = await prisma.appointment.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					phone_number: true,
				},
			},
			service: true,
			schedule: {
				include: {
					worker: true,
				},
			},
		},
	});
	const total = await prisma.appointment.count({ where: whereConditions });
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_appointment,
	};
};

//* appointment  details
const get_appointment_details = async (
	id: string,
	current_user: JwtPayload
): Promise<Appointment | null> => {
	const isExist = await prisma.appointment.findUnique({
		where: { id },
		include: { service: true, schedule: true },
	});

	// condition
	if (
		current_user?.role === UserRole.customer &&
		isExist?.user_id !== current_user?.user_id
	) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"You are not authorized to access this.."
		);
	}
	if (
		current_user?.role === UserRole.worker &&
		isExist?.schedule?.provider_id !== current_user?.user_id
	) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"You are not authorized to access this resource"
		);
	}

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "appointment not found");
	}

	return isExist;
};

//* appointment  updating
const appointment_update = async (
	appointment_data: Partial<Appointment>,
	appointment_id: string
): Promise<Appointment | null> => {
	// appointment   checking
	const isExist = await prisma.appointment.findUnique({
		where: { id: appointment_id },
	});
	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "appointment not found");
	}
	// service checking
	if (appointment_data.service_id) {
		const service = await prisma.service.findUnique({
			where: {
				id: appointment_data.service_id,
			},
		});

		if (!service) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"Service not found"
			);
		}
	}

	// schedule  checking
	if (appointment_data.schedule_id) {
		const schedule = await prisma.schedule.findUnique({
			where: {
				id: appointment_data.schedule_id,
			},
		});

		if (!schedule) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"Schedule not found"
			);
		}
	}

	const appointment = await prisma.appointment.update({
		where: { id: appointment_id },
		data: appointment_data,
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					phone_number: true,
				},
			},
			service: true,
			schedule: {
				include: {
					worker: true,
				},
			},
		},
	});

	return appointment;
};

// * delete_appointment
const delete_appointment = async (
	appointment_id: string
): Promise<Appointment | null> => {
	// appointment checking function
	const isExist = await prisma.appointment.findUnique({
		where: { id: appointment_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "appointment not found");
	}

	// appointment deleting
	const deleted_appointment = await prisma.appointment.delete({
		where: { id: appointment_id },
	});

	return deleted_appointment;
};

export const appointmentServices = {
	create_new_appointment,
	appointment_update,
	get_all_appointments,
	get_appointment_details,
	delete_appointment,
	get_all_appointments_by_worker,
};


import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { pagination_keys } from "../../../constant/common";
import { appointmentServices } from "./appointment.services";
import { appointment_filter_keys } from "./appointment.constant";

// *createAppointment
const createAppointment = catchAsync(async (req: Request, res: Response) => {
	const { ...appointment__data } = req.body;

	const result = await appointmentServices.create_new_appointment(
		appointment__data
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "appointment created successfully",
	});
});

//*  updateAppointment
const updateAppointment = catchAsync(async (req: Request, res: Response) => {
	const { id: appointment_id } = req.params;

	const { ...appointment_full_data } = req.body;
	const result = await appointmentServices.appointment_update(
		appointment_full_data,
		appointment_id
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "appointment updated successfully",
	});
});

//*  Get all appointments
const allAppointments = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, appointment_filter_keys);
	const pagination = pick(req.query, pagination_keys);
	const logged_in_user = req.logged_in_user;

	const result = await appointmentServices.get_all_appointments(
		filers,
		pagination,
		logged_in_user
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "appointments retrieved successfully",
	});
});
//*  Get all appointments

const allAppointmentsByWorkers = catchAsync(
	async (req: Request, res: Response) => {
		const filers = pick(req.query, appointment_filter_keys);
		const pagination = pick(req.query, pagination_keys);
		const logged_in_user = req.logged_in_user;

		const result =
			await appointmentServices.get_all_appointments_by_worker(
				filers,
				pagination,
				logged_in_user
			);

		sendResponse(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result,
			message: "appointments retrieved successfully",
		});
	}
);

//  appointmentDetails
const appointmentDetails = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const logged_in_user = req.logged_in_user;

	const result = await appointmentServices.get_appointment_details(
		id,
		logged_in_user
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "appointment details retrieved successfully",
	});
});

// deleteAppointment
const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await appointmentServices.delete_appointment(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "appointment deleted successfully",
	});
});

export const appointmentController = {
	createAppointment,
	appointmentDetails,
	updateAppointment,
	deleteAppointment,
	allAppointments,
	allAppointmentsByWorkers,
};


import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

// Zod schema for creating a new appointment
export const create_appointment_zod_schema = z.object({
	body: z.object({
		user_id: z.string({ required_error: "User ID is required" }),
		service_id: z.string({
			required_error: "Service ID is required",
		}),
		schedule_id: z.string({
			required_error: "Schedule ID is required",
		}),
		status: z.nativeEnum(AppointmentStatus, {
			required_error: "Status is required",
		}),
		date: z.string({ required_error: "Date is required" }),
		start_time: z.string({
			required_error: "Start time is required",
		}),
		end_time: z.string({ required_error: "End time is required" }),
	}),
});

// Zod schema for updating an existing appointment
export const update_appointment_zod_schema = z.object({
	body: z.object({
		user_id: z.string().optional(),
		service_id: z.string().optional(),
		schedule_id: z.string().optional(),
		status: z.nativeEnum(AppointmentStatus).optional(),
		date: z.string().optional(),
		start_time: z.string().optional(),
		end_time: z.string().optional(),
	}),
});


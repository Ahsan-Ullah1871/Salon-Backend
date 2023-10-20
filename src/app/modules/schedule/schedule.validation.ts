import { z } from "zod";

export const create_schedule_zod_schema = z.object({
	body: z.object({
		date: z.string({ required_error: "Date is required" }),
		start_time: z.string({
			required_error: "Start time is required",
		}),
		end_time: z.string({ required_error: "End time is required" }),
		available: z.boolean().default(false),
		service_id: z.string({
			required_error: "Service ID is required",
		}),
		provider_id: z.string({
			required_error: "Provider ID is required",
		}),
	}),
});

export const update_schedule_zod_schema = z.object({
	body: z.object({
		date: z.string().optional(),
		start_time: z.string().optional(),
		end_time: z.string().optional(),
		available: z.boolean().optional(),
		service_id: z.string().optional(),
		provider_id: z.string().optional(),
	}),
});


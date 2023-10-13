import { z } from "zod";

export const create_worker_zod_schema = z.object({
	is_authorized: z.boolean().default(false),
	user_id: z.string({ required_error: "User ID is required" }),
	email: z
		.string({ required_error: "Email is required" })
		.min(5, { message: "Email must be at least 5 characters" }),
	name: z.string({ required_error: "Name is required" }),
	father_name: z.string({ required_error: "Father Name is required" }),
	mother_name: z.string({ required_error: "Mother Name is required" }),
	is_married: z.boolean().default(false),
	phone_number: z.number({ required_error: "Phone Number is required" }),
	permanent_address: z.string({
		required_error: "Permanent Address is required",
	}),
	current_address: z.string({
		required_error: "Current Address is required",
	}),
	national_id: z.number({ required_error: "National ID is required" }),
	birth_date: z.string({ required_error: "Birth Date is required" }),
	working_history: z.object({
		age: z.number({ required_error: "Age is required" }),
		exp: z.number().default(0),
		last_job_info: z.string().default(""),
		last_job_salary: z.number().optional(),
		last_job_review: z.string().optional(),
		last_job_leaving_reason: z.string().optional(),
	}),
});

export const update_review_zod_schema = z.object({
	is_authorized: z.boolean().default(false).optional(),
	user_id: z.string({ required_error: "User ID is required" }).optional(),
	email: z
		.string({ required_error: "Email is required" })
		.min(5, { message: "Email must be at least 5 characters" })
		.optional(),
	name: z.string({ required_error: "Name is required" }).optional(),
	father_name: z
		.string({ required_error: "Father Name is required" })
		.optional(),
	mother_name: z
		.string({ required_error: "Mother Name is required" })
		.optional(),
	is_married: z.boolean().default(false).optional(),
	phone_number: z
		.number({ required_error: "Phone Number is required" })
		.optional(),
	permanent_address: z
		.string({
			required_error: "Permanent Address is required",
		})
		.optional(),
	current_address: z
		.string({
			required_error: "Current Address is required",
		})
		.optional(),
	national_id: z
		.number({ required_error: "National ID is required" })
		.optional(),
	birth_date: z
		.string({ required_error: "Birth Date is required" })
		.optional(),
	working_history: z.object({
		age: z.number({ required_error: "Age is required" }).optional(),
		exp: z.number().default(0).optional(),
		last_job_info: z.string().default(""),
		last_job_salary: z.number().optional(),
		last_job_review: z.string().optional(),
		last_job_leaving_reason: z.string().optional(),
	}),
});


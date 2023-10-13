import { z } from "zod";

export const create_review_zod_schema = z.object({
	user_id: z.string({ required_error: "User ID is required" }),
	service_id: z.string({ required_error: "Service ID is required" }),
	rating: z.number({ required_error: "Rating is required" }),
	comment: z.string().optional(),
});

export const update_review_zod_schema = z.object({
	body: z.object({
		user_id: z
			.string({ required_error: "User ID is required" })
			.optional(),
		service_id: z
			.string({
				required_error: "Service ID is required",
			})
			.optional(),
		rating: z
			.number({ required_error: "Rating is required" })
			.optional(),
		comment: z.string().optional(),
	}),
});


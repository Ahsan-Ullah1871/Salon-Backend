import { z } from "zod";

export const create_service_zod_schema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
		image_url: z.string({ required_error: "Image URL is required" }),
		image_id: z.string({ required_error: "Image ID is required" }),
		description: z
			.string({ required_error: "Description is required" })
			.optional(),
		price: z.number({ required_error: "Price is required" }),
		duration: z.string({ required_error: "Duration is required" }),
		category_id: z.string({
			required_error: "Category ID is required",
		}),
		is_available: z.boolean().default(true),
	}),
});

export const update_service_zod_schema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }).optional(),
		image_url: z
			.string({ required_error: "Image URL is required" })
			.optional(),
		image_id: z
			.string({ required_error: "Image ID is required" })
			.optional(),
		description: z
			.string({ required_error: "Description is required" })
			.optional(),
		price: z
			.number({ required_error: "Price is required" })
			.optional(),
		duration: z
			.string({ required_error: "Duration is required" })
			.optional(),
		category_id: z
			.string({
				required_error: "Category ID is required",
			})
			.optional(),
		is_available: z.boolean().default(true).optional(),
	}),
});


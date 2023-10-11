import { z } from "zod";
import prisma from "../../../shared/prisma";
import { UserRole } from "@prisma/client";

export const category_upload_zod_schema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
		image_url: z.string({ required_error: "Image URL is required" }),

		image_id: z.string({ required_error: "Image ID is required" }),

		description: z
			.string({ required_error: "Category desc is required" })
			.optional(),
	}),
});

export const category_update_zod_schema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }).optional(),
		image_url: z
			.string({ required_error: "Image URL is required" })
			.optional(),
		image_id: z
			.string({ required_error: "Image ID is required" })
			.optional(),
		description: z
			.string({ required_error: "Category desc is required" })
			.optional(),
	}),
});


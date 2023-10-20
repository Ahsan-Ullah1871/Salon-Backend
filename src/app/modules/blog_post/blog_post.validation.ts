import { z } from "zod";

export const create_blog_zod_schema = z.object({
	body: z.object({
		title: z.string({ required_error: "Title is required" }),
		content: z.string({ required_error: "Content is required" }),
		author_id: z.string({ required_error: "Author ID is required" }),
		image_url: z.string({ required_error: "Image is required" }),
		image_id: z.string({ required_error: "Image ID is required" }),
		tags: z.string({ required_error: "Tags are required" }),
		service_id: z.string().optional(),
		published: z.boolean().default(false),
		publishedAt: z.string().optional(),
	}),
});

export const update_blog_zod_schema = z.object({
	body: z.object({
		title: z
			.string({ required_error: "Title is required" })
			.optional(),
		content: z
			.string({ required_error: "Content is required" })
			.optional(),
		author_id: z
			.string({ required_error: "Author ID is required" })
			.optional(),
		tags: z
			.string({ required_error: "Tags are required" })
			.optional(),
		service_id: z.string().optional(),
		published: z.boolean().default(false).optional(),
		publishedAt: z.string().optional(),
	}),
});


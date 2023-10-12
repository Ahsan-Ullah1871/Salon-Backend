import { pagination_map } from "../../../helpers/pagination";
import { GenericResponse } from "../../../interfaces/common";
import { IPagination } from "../../../interfaces/pagination";
import { GetWhereConditions } from "./blog_post.condition";
import ApiError from "../../errors/ApiError";

import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { IBlogPostFilter } from "./blog_post.interface";
import { Prisma, BlogPost } from "@prisma/client";

//* Create new blog_post
const create_new_blog = async (
	blog_post: BlogPost
): Promise<BlogPost | null> => {
	// author checking
	const isUserExist = await prisma.user.findUnique({
		where: { id: blog_post.author_id },
	});

	if (isUserExist === null) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Author not found ");
	}

	// blog_post checking if have blog_post
	if (blog_post.service_id) {
		const isServiceExist = await prisma.service.findUnique({
			where: { id: blog_post.service_id },
		});

		if (isServiceExist === null) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"Service not exist "
			);
		}
	}

	const created_service = await prisma.blogPost.create({
		data: blog_post,
	});

	return created_service;
};

//* gel_all_ blog_post
const get_all_blogs = async (
	filers: IBlogPostFilter,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<BlogPost[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.BlogPostWhereInput =
		GetWhereConditions(filers);

	//
	const all_blog_posts = await prisma.blogPost.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
	});

	const total = await prisma.blogPost.count();
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_blog_posts,
	};
};

// * Blogs By Service Id
const get_blogs_by_service_id = async (
	service_id: string,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<BlogPost[]> | null> => {
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	//
	const all_blogs = await prisma.blogPost.findMany({
		where: { service_id },
		skip,
		take: size,
		orderBy: sortObject,
	});
	const total = await prisma.blogPost.count({
		where: { service_id },
	});
	const totalPage = Math.ceil(total / size);
	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_blogs,
	};
};

//* BlogPost  details
const get_blog_details = async (id: string): Promise<BlogPost | null> => {
	const isExist = await prisma.blogPost.findUnique({ where: { id } });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
	}

	return isExist;
};

//* blog_post  updating
const blog_post_update = async (
	blog_post: Partial<BlogPost>,
	item_id: string
): Promise<BlogPost | null> => {
	// blog_post   checking

	const isExist = await prisma.blogPost.findUnique({
		where: { id: item_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "Blog Post not found");
	}

	// blog_post checking if have blog_post
	if (blog_post.service_id) {
		const isServiceExist = await prisma.service.findUnique({
			where: { id: blog_post.service_id },
		});

		if (isServiceExist === null) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"Service not exist "
			);
		}
	}

	//
	const updated_service_data = await prisma.blogPost.update({
		where: { id: item_id },
		data: blog_post,
	});

	if (!updated_service_data) {
		throw new ApiError(
			httpStatus.EXPECTATION_FAILED,
			"Failed to update blog post data"
		);
	}

	return updated_service_data;
};

// * delete_blog_post
const delete_blog_post = async (item_id: string): Promise<BlogPost | null> => {
	// blog_post checking function
	const isExist = await prisma.blogPost.findUnique({
		where: { id: item_id },
	});

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "Blog Post not found");
	}

	const deleted_item_data = await prisma.blogPost.delete({
		where: {
			id: item_id,
		},
	});

	return deleted_item_data;
};

export const BlogPostServices = {
	create_new_blog,
	blog_post_update,
	get_all_blogs,
	get_blog_details,
	delete_blog_post,
	get_blogs_by_service_id,
};


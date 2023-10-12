import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { blog_post_filter_keys } from "./blog_post.constant";
import { pagination_keys } from "../../../constant/common";
import { BlogPostServices } from "./blog_post.services";

// *createBlogPost
const createBlogPost = catchAsync(async (req: Request, res: Response) => {
	const { ...blog_post_data } = req.body;

	const result = await BlogPostServices.create_new_blog(blog_post_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "blog post created successfully",
	});
});

//*  updateBlogPost
const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
	const { id: blog_post_id } = req.params;
	const { ...blog_post_data } = req.body;

	const result = await BlogPostServices.blog_post_update(
		blog_post_data,
		blog_post_id
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "blog post updated successfully",
	});
});

//*  Get all blog_posts
const allBlogPosts = catchAsync(async (req: Request, res: Response) => {
	const filers = pick(req.query, blog_post_filter_keys);
	const pagination = pick(req.query, pagination_keys);

	const result = await BlogPostServices.get_all_blogs(filers, pagination);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Blog posts retrieved successfully",
	});
});

//* cateGoryBlogPosts
const BlogPostsByService = catchAsync(async (req: Request, res: Response) => {
	const { serviceID: service_id } = req.params;
	const pagination = pick(req.query, pagination_keys);

	const result = await BlogPostServices.get_blogs_by_service_id(
		service_id,
		pagination
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: " BlogPosts retrieved successfully",
	});
});

//  blog_postDetails
const blogPostDetails = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await BlogPostServices.get_blog_details(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "blog  details retrieved successfully",
	});
});

// deleteBlogPost
const deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BlogPostServices.delete_blog_post(id);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "blog post deleted successfully",
	});
});

export const BlogPostController = {
	createBlogPost,
	blogPostDetails,
	updateBlogPost,
	deleteBlogPost,
	allBlogPosts,
	BlogPostsByService,
};


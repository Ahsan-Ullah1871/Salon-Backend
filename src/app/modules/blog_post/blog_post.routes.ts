import express from "express";
import requestValidationHandler from "../../middlewares/requestValidationHandler";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import {
	create_blog_zod_schema,
	update_blog_zod_schema,
} from "./blog_post.validation";
import { BlogPostController } from "./blog_post.controller";

const router = express.Router();

router.post(
	"/create",
	authHandler(
		UserRole.admin,
		UserRole.super_admin,
		UserRole.admin,
		UserRole.worker
	),
	requestValidationHandler(create_blog_zod_schema),
	BlogPostController.createBlogPost
);

router.get("/", BlogPostController.allBlogPosts);
router.get("/service/:serviceID/", BlogPostController.BlogPostsByService);

router.get("/:id", BlogPostController.blogPostDetails);

router.patch(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin, UserRole.worker),
	requestValidationHandler(update_blog_zod_schema),
	BlogPostController.updateBlogPost
);
router.delete(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin, UserRole.worker),
	BlogPostController.deleteBlogPost
);

export const ServiceRoute = router;


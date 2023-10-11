import express from "express";
import { CategoryController } from "./category.controller";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import requestValidationHandler from "../../middlewares/requestValidationHandler";
import {
	category_update_zod_schema,
	category_upload_zod_schema,
} from "./category.validation";

const router = express.Router();

router.get("/", CategoryController.categoryList);

router.get("/:id", CategoryController.categoryDetails);

router.post(
	"/",
	authHandler(UserRole.admin, UserRole.super_admin),
	requestValidationHandler(category_upload_zod_schema),
	CategoryController.categoryUpload
);

router.patch(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	requestValidationHandler(category_update_zod_schema),
	CategoryController.categoryUpdate
);

router.delete(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	CategoryController.deleteCategory
);

export const CategoryRoute = router;


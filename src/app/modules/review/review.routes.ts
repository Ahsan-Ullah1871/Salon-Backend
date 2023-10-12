import express from "express";
import requestValidationHandler from "../../middlewares/requestValidationHandler";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import {
	create_review_zod_schema,
	update_review_zod_schema,
} from "./review.validation";
import { reviewController } from "./review.controller";

const router = express.Router();

router.post(
	"/create",
	authHandler(UserRole.super_admin, UserRole.admin, UserRole.customer),
	requestValidationHandler(create_review_zod_schema),
	reviewController.createReview
);

router.get("/", reviewController.allReviews);

router.get("/:id", reviewController.reviewDetails);

router.patch(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin, UserRole.worker),
	requestValidationHandler(update_review_zod_schema),
	reviewController.updateReview
);
router.delete(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin, UserRole.customer),
	reviewController.deleteReview
);

export const ReviewRoute = router;


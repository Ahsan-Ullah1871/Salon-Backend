import express from "express";
import requestValidationHandler from "../../middlewares/requestValidationHandler";

import { ServiceController } from "./service.controller";
import {
	create_service_zod_schema,
	update_service_zod_schema,
} from "./service.validation";
import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
	"/create",
	authHandler(UserRole.admin, UserRole.super_admin),
	requestValidationHandler(create_service_zod_schema),
	ServiceController.createService
);

router.get("/", ServiceController.allServices);
router.get("/:categoryID/category", ServiceController.cateGoryServices);
router.get("/:id", ServiceController.serviceDetails);

router.patch(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	requestValidationHandler(update_service_zod_schema),
	ServiceController.updateService
);
router.delete(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	ServiceController.deleteService
);

export const ServiceRoute = router;


import {
	create_worker_zod_schema,
	update_review_zod_schema,
} from "./worker.validation";
import express from "express";
import requestValidationHandler from "../../middlewares/requestValidationHandler";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import { workerController } from "./worker.controller";

const router = express.Router();

router.post(
	"/create",
	authHandler(UserRole.super_admin, UserRole.admin, UserRole.worker),
	requestValidationHandler(create_worker_zod_schema),
	workerController.createWorker
);

router.get("/", workerController.allWorkers);

router.get("/:id", workerController.workerDetails);

router.patch(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin, UserRole.worker),
	requestValidationHandler(update_review_zod_schema),
	workerController.updateWorker
);
router.delete(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	workerController.deleteWorker
);

export const WorkerRoute = router;


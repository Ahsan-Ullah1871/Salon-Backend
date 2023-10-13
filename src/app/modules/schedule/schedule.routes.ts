import express from "express";
import requestValidationHandler from "../../middlewares/requestValidationHandler";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import {
	create_schedule_zod_schema,
	update_schedule_zod_schema,
} from "./schedule.validation";
import { scheduleController } from "./schedule.controller";

const router = express.Router();

router.post(
	"/create",
	authHandler(UserRole.super_admin, UserRole.admin),
	requestValidationHandler(create_schedule_zod_schema),
	scheduleController.createSchedule
);

router.get("/", scheduleController.allSchedules);

router.get("/:id", scheduleController.scheduleDetails);

router.patch(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	requestValidationHandler(update_schedule_zod_schema),
	scheduleController.updateSchedule
);
router.delete(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	scheduleController.deleteSchedule
);

export const ScheduleRoute = router;


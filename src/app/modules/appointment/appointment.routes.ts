import express from "express";
import requestValidationHandler from "../../middlewares/requestValidationHandler";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import {
	create_appointment_zod_schema,
	update_appointment_zod_schema,
} from "./appointment.validation";
import { appointmentController } from "./appointment.controller";

const router = express.Router();

router.post(
	"/create",
	authHandler(UserRole.customer, UserRole.admin, UserRole.super_admin),
	requestValidationHandler(create_appointment_zod_schema),
	appointmentController.createAppointment
);

router.get(
	"/",
	authHandler(UserRole.customer, UserRole.admin, UserRole.super_admin),
	appointmentController.allAppointments
);

router.get(
	"/worker",
	authHandler(UserRole.admin, UserRole.super_admin, UserRole.worker),
	appointmentController.allAppointmentsByWorkers
);

router.get(
	"/:id",
	authHandler(
		UserRole.customer,
		UserRole.admin,
		UserRole.super_admin,
		UserRole.worker
	),
	appointmentController.appointmentDetails
);

router.patch(
	"/:id",
	authHandler(
		UserRole.customer,
		UserRole.admin,
		UserRole.super_admin,
		UserRole.worker
	),
	requestValidationHandler(update_appointment_zod_schema),
	appointmentController.updateAppointment
);
router.delete(
	"/:id",
	authHandler(UserRole.customer, UserRole.admin, UserRole.super_admin),
	appointmentController.deleteAppointment
);

export const AppointmentRoute = router;


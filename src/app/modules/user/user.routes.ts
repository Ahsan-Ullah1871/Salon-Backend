import express from "express";
import { UserController } from "./user.controller";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
	"/",
	authHandler(UserRole.admin, UserRole.super_admin),
	UserController.usersList
);

router.get(
	"/profile",
	authHandler(
		UserRole.admin,
		UserRole.customer,
		UserRole.super_admin,
		UserRole.worker
	),
	UserController.userProfile
);

router.get(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin),
	UserController.userDetails
);

router.patch(
	"/:id",
	authHandler(
		UserRole.admin,
		UserRole.super_admin,
		UserRole.customer,
		UserRole.worker
	),
	UserController.userUpdate
);

router.delete(
	"/:id",
	authHandler(UserRole.admin, UserRole.super_admin, UserRole.customer),
	UserController.deleteUser
);

export const UserRoute = router;


import express from "express";
import { UserController } from "./user.controller";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", authHandler(UserRole.admin), UserController.usersList);
router.get(
	"/profile",
	authHandler(UserRole.admin, UserRole.customer),
	UserController.userProfile
);
router.get("/:id", authHandler(UserRole.admin), UserController.userDetails);
router.patch("/:id", authHandler(UserRole.admin), UserController.userUpdate);
router.delete("/:id", authHandler(UserRole.admin), UserController.deleteUser);

export const UserRoute = router;


import { UserRole } from "@prisma/client";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";
import authHandler from "../../middlewares/authHandler";
import requestValidationHandler from "../../middlewares/requestValidationHandler";
import { FileController } from "./file.controller";
import {
	user_signin_zod_schema,
	user_signup_zod_schema,
} from "./file.validation";
import express from "express";

const router = express.Router();

router.post(
	"/upload",
	authHandler(
		UserRole.admin,
		UserRole.super_admin,
		UserRole.worker,
		UserRole.customer
	),
	FileUploadHelper.upload.single("file"),
	FileController.fileUpload
);

router.get(
	"/",
	authHandler(
		UserRole.admin,
		UserRole.super_admin,
		UserRole.worker,
		UserRole.customer
	),
	FileController.allFiles
);

export const FileRoute = router;


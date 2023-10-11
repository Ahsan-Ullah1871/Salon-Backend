import { FileUploadHelper } from "../../../helpers/fileUploadHelper";
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
	// requestValidationHandler(user_signup_zod_schema),
	FileUploadHelper.upload.single("file"),
	FileController.fileUpload
);

export const FileRoute = router;


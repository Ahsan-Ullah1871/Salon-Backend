import requestValidationHandler from "../../middlewares/requestValidationHandler";
import { AuthController } from "./auth.controller";
import {
	refresh_token_zod_schema,
	user_signin_zod_schema,
	user_signup_zod_schema,
} from "./auth.validation";
import express from "express";

const router = express.Router();

router.post(
	"/signup",
	requestValidationHandler(user_signup_zod_schema),
	AuthController.signupUser
);

router.post(
	"/signin",
	requestValidationHandler(user_signin_zod_schema),
	AuthController.loginUser
);

router.post(
	"/refresh-token",
	requestValidationHandler(refresh_token_zod_schema),
	AuthController.refreshToken
);

export const AuthRoute = router;


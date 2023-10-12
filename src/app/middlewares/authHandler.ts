/* eslint-disable no-unused-expressions */

import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";

// requestValidationHandler
const authHandler =
	(...selected_roles: string[]) =>
	async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			//   check authorization
			const token = req.headers?.authorization;
			console.log("====================================");
			console.log({ token });
			console.log("====================================");

			if (!token) {
				throw new ApiError(
					httpStatus.UNAUTHORIZED,
					"Unauthorized"
				);
			}

			const decoded_user = jwtHelper.verify_token(
				token,
				config.jwt.access_token_secret as Secret
			);
			const { user_id, email, role } = decoded_user;
			console.log(decoded_user);

			// set in req
			req.logged_in_user = decoded_user;

			//   check if the user is authenticated
			if (!user_id) {
				throw new ApiError(
					httpStatus.UNAUTHORIZED,
					"Unauthorized"
				);
			}

			// user check form server
			const user_details = await prisma.user.findUnique({
				where: {
					id: user_id,
					email,
					role,
				},
			});
			if (!user_details) {
				throw new ApiError(
					httpStatus.UNAUTHORIZED,
					"Unauthorized"
				);
			}

			//  check if the user has the required role
			if (!selected_roles.includes(role)) {
				throw new ApiError(
					httpStatus.FORBIDDEN,
					"forbidden"
				);
			}

			next();
		} catch (error) {
			next(error);
		}
	};
export default authHandler;


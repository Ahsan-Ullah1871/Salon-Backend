/* eslint-disable no-unused-expressions */

import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

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
			const { userId, email, role } = decoded_user;
			console.log(userId, email, role);

			// set in req
			req.logged_in_user = decoded_user;

			//   check if the user is authenticated
			if (!userId) {
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


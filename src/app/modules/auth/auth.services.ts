import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
// import { IUserLogin } from "../user/user.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { ILogin, ILoginResponse, ISignUpResponse } from "./auth.interface";
import { hashingHelper } from "../../../helpers/hashingHelper";

//* Create new user
const user_signup = async (
	user_data: User
): Promise<ISignUpResponse | null> => {
	// checking if user already exists
	const user = await prisma.user.findUnique({
		where: {
			email: user_data.email,
		},
	});
	if (user) {
		throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
	}

	// hashing  password
	const hashed_password = await hashingHelper.encrypt_password(
		user_data.password
	);

	// creating new user
	const created_user = await prisma.user.create({
		data: { ...user_data, password: hashed_password },
	});

	// removing password from result
	const userWithoutPassword: Partial<User> = created_user;
	delete userWithoutPassword.password;

	// access token
	const token = jwtHelper.create_token(
		{
			user_id: created_user?.id,
			role: created_user?.role,
			email: created_user?.email,
		},
		config.jwt.access_token_secret as Secret,
		config.jwt.access_token_expiresIn as string
	);
	// refreshToken
	const refresh_token = jwtHelper.create_token(
		{
			user_id: created_user?.id,
			role: created_user?.role,
			email: created_user?.email,
		},
		config.jwt.refresh_token_secret as Secret,
		config.jwt.refresh_token_expiresIn as string
	);

	// return
	return { token, refresh_token, user: userWithoutPassword };
};

//* login user
const user_login = async (
	user_data: ILogin
): Promise<ILoginResponse | null> => {
	// user fetched
	const user = await prisma.user.findUnique({
		where: {
			email: user_data.email,
		},
	});

	// if user is not found
	if (!user) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"User not found, check your email and password"
		);
	}

	// password checking
	const is_password_match = await hashingHelper.match_password(
		user_data.password,
		user.password
	);

	// if password is not match
	if (!is_password_match) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"User not found, check your email and password"
		);
	}

	//  role check
	if (user.role !== user_data.role) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"User not found, check your email and password"
		);
	}

	// access token
	const token = jwtHelper.create_token(
		{
			user_id: user?.id,
			role: user?.role,
			email: user?.email,
		},
		config.jwt.access_token_secret as Secret,
		config.jwt.access_token_expiresIn as string
	);

	// refreshToken
	const refresh_token = jwtHelper.create_token(
		{
			user_id: user?.id,
			role: user?.role,
			email: user?.email,
		},
		config.jwt.refresh_token_secret as Secret,
		config.jwt.refresh_token_expiresIn as string
	);
	// removing password from result
	const userWithoutPassword: Partial<User> = user;
	delete userWithoutPassword.password;

	return { token, refresh_token, user: userWithoutPassword };
};

//* refresh_token
const refresh_token = async (
	refresh_token: string
): Promise<ILoginResponse | null> => {
	// verify that the refresh token
	const token = refresh_token;
	const decoded = jwtHelper.verify_token(
		token,
		config.jwt.refresh_token_secret as string
	);

	// if token is not valid
	if (!decoded) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"Refresh token is not valid"
		);
	}

	// user fetched
	const user = await prisma.user.findUnique({
		where: {
			email: decoded.email,
			role: decoded.role,
		},
	});

	// if user is not found
	if (!user) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"User not found, check your email and password"
		);
	}

	// access token
	const new_token = jwtHelper.create_token(
		{
			user_id: user?.id,
			role: user?.role,
			email: user?.email,
		},
		config.jwt.access_token_secret as Secret,
		config.jwt.access_token_expiresIn as string
	);

	// refreshToken
	const new_refresh_token = jwtHelper.create_token(
		{
			user_id: user?.id,
			role: user?.role,
			email: user?.email,
		},
		config.jwt.refresh_token_secret as Secret,
		config.jwt.refresh_token_expiresIn as string
	);

	// removing password from result
	const userWithoutPassword: Partial<User> = user;
	delete userWithoutPassword.password;

	return {
		token: new_token,
		refresh_token: new_refresh_token,
		user: userWithoutPassword,
	};
};

export const AuthServices = {
	user_signup,
	user_login,
	refresh_token,
};


import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { Prisma, User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { JwtPayload, Secret } from "jsonwebtoken";
import { hashingHelper } from "../../../helpers/hashingHelper";
import { pagination_map } from "../../../helpers/pagination";
import { IUserFilter, PartialUserData } from "./user.interface";
import { IPagination } from "../../../interfaces/pagination";
import { GenericResponse } from "../../../interfaces/common";
import { GetWhereConditions } from "./user.condition";
import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import { ILoginResponse } from "../auth/auth.interface";

//Users  list
const users_list = async (
	filers: IUserFilter,
	pagination_data: Partial<IPagination>
): Promise<GenericResponse<PartialUserData[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.UserWhereInput =
		GetWhereConditions(filers);

	//
	const all_users = await prisma.user.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			phone_number: true,
			address: true,
			profile_image: true,
			created_at: true,
			updated_at: true,
		},
	});
	const total = await prisma.user.count({
		where: whereConditions,
	});
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_users,
	};
};

//Users  details
const users_details = async (id: string): Promise<Partial<User> | null> => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			name: true,
			email: true,
			role: true,
			phone_number: true,
			address: true,
			profile_image: true,
			created_at: true,
			updated_at: true,
		},
	});
	return user;
};

//* Users  details
const users_profile = async (
	user_data: JwtPayload
): Promise<Partial<User> | null> => {
	const user = await prisma.user.findUnique({
		where: {
			id: user_data.user_id,
			email: user_data.email,
			role: user_data.role,
		},
	});

	return user;
};

//* Users  update
const users_update = async (
	id: string,
	user_data: User,
	logged_in_user: JwtPayload
): Promise<Partial<User> | null> => {
	//  user details from server
	const user_details_from_server = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	// if user is not found
	if (!user_details_from_server) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"User not found, check your email and password"
		);
	}

	// hashing the user password if available
	if (user_data.password) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You can't change the password from here "
		);
	}

	// if in data have role assigned it should be shown as a error message
	if (
		user_data.role &&
		user_data.role !== logged_in_user.role &&
		logged_in_user.role !== UserRole.super_admin
	) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You can't change the role of a user"
		);
	}

	const user = await prisma.user.update({
		where: {
			id,
		},
		data: user_data,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			phone_number: true,
			address: true,
			profile_image: true,
			created_at: true,
			updated_at: true,
		},
	});

	return user;
};

//* Users  update
const edit_profile = async (
	id: string,
	user_data: User,
	logged_in_user: JwtPayload
): Promise<Partial<ILoginResponse> | null> => {
	//  user details from server
	const user_details_from_server = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	// if user is not found
	if (!user_details_from_server) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"User not found, check your email and password"
		);
	}

	// hashing the user password if available
	if (user_data.password) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You can't change the password from here "
		);
	}

	// if in data have role assigned it should be shown as a error message
	if (
		user_data.role &&
		user_data.role !== logged_in_user.role &&
		logged_in_user.role !== UserRole.super_admin
	) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You can't change the role of a user"
		);
	}

	const user = await prisma.user.update({
		where: {
			id,
		},
		data: user_data,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			phone_number: true,
			address: true,
			profile_image: true,
			created_at: true,
			updated_at: true,
		},
	});

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

	return { token, refresh_token, user: user };
};

//* Users  delete
const users_delete = async (id: string): Promise<Partial<User> | null> => {
	//  user details from server
	const user_details_from_server = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	// if user is not found
	if (!user_details_from_server) {
		throw new ApiError(httpStatus.FORBIDDEN, "User not found");
	}

	// user_appointments_list
	const user_appointments_list = await prisma.appointment.findMany({
		where: {
			user_id: id,
		},
	});

	// user files list
	const user_files_list = await prisma.userFile.findMany({
		where: {
			user_id: id,
		},
	});

	// user reviews list
	const user_reviews_list = await prisma.review.findMany({
		where: {
			user_id: id,
		},
	});

	// user blog posts list
	const user_blog_posts_list = await prisma.blogPost.findMany({
		where: {
			author_id: id,
		},
	});

	// user feedbacks list
	const user_feedbacks_list = await prisma.feedback.findMany({
		where: {
			user_id: id,
		},
	});

	const delete_user = await prisma.$transaction(async (transaction) => {
		// delete appointments
		if (user_appointments_list?.length > 0) {
			const appointments =
				await transaction.appointment.deleteMany({
					where: {
						user_id: id,
					},
				});
		}
		// delete files
		if (user_files_list?.length > 0) {
			const files = await transaction.userFile.deleteMany({
				where: {
					user_id: id,
				},
			});
		}
		// delete reviews
		if (user_reviews_list?.length > 0) {
			const reviews = await transaction.review.deleteMany({
				where: {
					user_id: id,
				},
			});
		}
		// delete blog posts
		if (user_blog_posts_list?.length > 0) {
			const blog_posts = await transaction.blogPost.deleteMany({
				where: {
					author_id: id,
				},
			});
		}
		// delete feedbacks
		if (user_feedbacks_list?.length > 0) {
			const feedbacks = await transaction.feedback.deleteMany({
				where: {
					user_id: id,
				},
			});
		}

		// delete user
		const user = await transaction.user.delete({
			where: {
				id,
			},
			select: {
				name: true,
				email: true,
				role: true,
				phone_number: true,
				address: true,
				profile_image: true,
			},
		});

		return user;
	});

	if (delete_user) {
		return delete_user;
	}

	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to delete user");
};

export const UserServices = {
	users_details,
	users_list,
	users_delete,
	users_update,
	users_profile,
	edit_profile,
};


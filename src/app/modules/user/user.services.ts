import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { JwtPayload } from "jsonwebtoken";

//Users  list
const users_list = async (): Promise<Partial<User>[] | null> => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			contactNo: true,
			address: true,
			profileImg: true,
		},
	});
	return users;
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
			contactNo: true,
			address: true,
			profileImg: true,
		},
	});
	return user;
};

//Users  details
const users_profile = async (
	user_data: JwtPayload
): Promise<Partial<User> | null> => {
	const user = await prisma.user.findUnique({
		where: {
			id: user_data.userId,
			email: user_data.email,
		},
	});
	return user;
};

//Users  update
const users_update = async (
	id: string,
	user_data: User
): Promise<Partial<User> | null> => {
	const user = await prisma.user.update({
		where: {
			id,
		},
		data: user_data,
		select: {
			name: true,
			email: true,
			role: true,
			contactNo: true,
			address: true,
			profileImg: true,
		},
	});
	return user;
};
//Users  delete
const users_delete = async (id: string): Promise<Partial<User> | null> => {
	const user_orders_list = await prisma.order.findMany({
		where: {
			userId: id,
		},
	});

	const delete_user = await prisma.$transaction(async (transaction) => {
		if (user_orders_list?.length > 0) {
			// delete order books
			for (let i = 0; i < user_orders_list.length; i++) {
				const single_oder = user_orders_list[i];

				const delete_order_book =
					await transaction.orderBook.deleteMany({
						where: {
							orderId: single_oder.id,
						},
					});
			}

			// delete orders
			const orders_deleted = await transaction.order.deleteMany({
				where: {
					userId: id,
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
				contactNo: true,
				address: true,
				profileImg: true,
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
};


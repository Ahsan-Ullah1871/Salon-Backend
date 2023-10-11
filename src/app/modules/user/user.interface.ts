import { IUser_role } from "../../../interfaces/common";
import { User } from "@prisma/client";

// User filter type
export type IUserFilter = {
	email?: string;
	role?: IUser_role;
	address?: string;
	searchTerm?: string;
};

// user login interface
export type IUserLogin = {
	email: string;
	password: string;
};

export type IUserLoginResponse = {
	accessToken: string;
	user_details: Partial<User>;
	refreshToken?: string;
};


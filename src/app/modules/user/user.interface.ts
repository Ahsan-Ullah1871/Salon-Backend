import { IUser_role } from "../../../interfaces/common";
import { User, UserRole } from "@prisma/client";

// User filter type
export type IUserFilter = {
	email?: string;
	name?: string;
	phone_number?: string;
	address?: string;
	role?: IUser_role;
	search?: string;
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

export type PartialUserData = {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	phone_number: string;
	address: string;
	profile_image: string | null;
	created_at: Date;
	updated_at: Date;
};


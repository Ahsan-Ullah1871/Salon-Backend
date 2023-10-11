import { User, UserRole } from "@prisma/client";

export type ILogin = {
	email: string;
	password: string;
	role: UserRole;
};

export type ILoginResponse = {
	token: string;
	refresh_token: string;
	user: Partial<User>;
};

export type ISignUpResponse = {
	token: string;
	refresh_token: string;
	user: Partial<User>;
};


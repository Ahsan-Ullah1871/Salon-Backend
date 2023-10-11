import { UserRole } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../shared/prisma";

export const user_signup_zod_schema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
		email: z.string({ required_error: "Email address is required" }),
		password: z.string({ required_error: "Password  is required" }),
		role: z.enum(
			[...Object.values(UserRole)] as [string, ...string[]],
			{
				required_error: "role  is required",
			}
		),
		contactNo: z.string({
			required_error: "Contact no  is required",
		}),
		address: z.string({ required_error: "address  is required" }),
		profileImg: z.string({
			required_error: "profile image  is required",
		}),
	}),
});

export const user_signin_zod_schema = z.object({
	body: z.object({
		email: z.string({ required_error: "Email address is required" }),
		password: z.string({ required_error: "Password  is required" }),
	}),
});


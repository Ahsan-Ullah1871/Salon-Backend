import { z } from "zod";
import prisma from "../../../shared/prisma";
import { UserRole } from "@prisma/client";

export const user_signup_zod_schema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
		email: z.string({
			required_error: "Email address is required",
		}),
		password: z.string({
			required_error: "Password  is required",
		}),
		role: z.enum(
			[...Object.values(UserRole)] as [string, ...string[]],
			{
				required_error: "User role  is required",
			}
		),

		profile_image: z
			.string({
				required_error: "Profile Image  is required",
			})
			.optional(),
		address: z.string({
			required_error: "address  is required",
		}),
		phone_number: z.string({
			required_error: "Phone number  is required",
		}),
	}),
});

export const user_signin_zod_schema = z.object({
	body: z.object({
		email: z.string({ required_error: "Email address is required" }),
		password: z.string({ required_error: "Password  is required" }),
		role: z.enum(
			[...Object.values(UserRole)] as [string, ...string[]],
			{
				required_error: "User role  is required",
			}
		),
	}),
});

export const refresh_token_zod_schema = z.object({
	body: z.object({
		refresh_token: z.string({
			required_error: "Refresh token is required",
		}),
	}),
});


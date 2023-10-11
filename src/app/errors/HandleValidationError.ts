import { Prisma } from "@prisma/client";
import {
	generic_error_type,
	modified_error_res_type,
} from "../../interfaces/error";

export const handleValidationError = (
	err: Prisma.PrismaClientValidationError
): modified_error_res_type => {
	const all_errors: generic_error_type[] = [
		{
			path: "",
			message: err?.message ?? "There have issue currently",
		},
	];

	return {
		status_code: 400,
		message:
			err?.message ??
			"Validation Error;Some values are missing or incorrect",
		errorMessages: all_errors,
	};
};


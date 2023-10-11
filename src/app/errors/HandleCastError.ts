import { Prisma } from "@prisma/client";
import {
	generic_error_type,
	modified_error_res_type,
} from "../../interfaces/error";
import httpStatus from "http-status";

export const handleKnownError = (
	err: Prisma.PrismaClientKnownRequestError
): modified_error_res_type => {
	const all_errors: generic_error_type[] = [
		{
			path: "",
			message: err?.message ?? "There have issue currently",
		},
	];

	return {
		status_code: httpStatus.FORBIDDEN,
		message: err?.message ?? "Cast error; Invalid id ",
		errorMessages: all_errors,
	};
};


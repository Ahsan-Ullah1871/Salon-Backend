import { jwtHelper } from "../../../helpers/jwtHelper";
import prisma from "../../../shared/prisma";
// import { IUserLogin } from "../user/user.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";
import { Prisma, UserFile } from "@prisma/client";
import { IFileFilter } from "./file.interface";
import { IPagination } from "../../../interfaces/pagination";
import { JwtPayload } from "jsonwebtoken";
import { GenericResponse } from "../../../interfaces/common";
import { pagination_map } from "../../../helpers/pagination";
import { GetWhereConditions } from "./file.condition";

// Create new file
const file_upload = async (req: Request): Promise<UserFile | null> => {
	const file = req.file as IUploadFile;
	const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
	const user_data = req.logged_in_user;

	if (uploadedImage) {
		const created_file = await prisma.userFile.create({
			data: {
				title: uploadedImage.display_name,
				url: uploadedImage.secure_url,
				asset_id: uploadedImage.asset_id,
				format: uploadedImage.format,
				width: uploadedImage.width,
				height: uploadedImage.height,
				bytes: uploadedImage.bytes,
				user_id: user_data.user_id,
			},
		});

		return created_file;
	}
	throw new ApiError(httpStatus.BAD_REQUEST, "Image not uploaded ");
};

// * get_all_files

const get_all_files = async (
	logged_in_user: JwtPayload,
	pagination_data: Partial<IPagination>,
	filers: IFileFilter
): Promise<GenericResponse<UserFile[]> | null> => {
	//
	const { page, size, skip, sortObject } = pagination_map(
		pagination_data,
		"created_at"
	);

	// and conditions (for search and filter)
	const whereConditions: Prisma.UserFileWhereInput =
		GetWhereConditions(filers);

	//
	const all_file = await prisma.userFile.findMany({
		where: whereConditions,
		skip,
		take: size,
		orderBy: sortObject,
	});
	const total = await prisma.userFile.count({ where: whereConditions });
	const totalPage = Math.ceil(total / size);

	return {
		meta: {
			page: Number(page),
			size: Number(size),
			total: total,
			totalPage,
		},
		data: all_file,
	};
};

export const FileServices = {
	file_upload,
	get_all_files,
};


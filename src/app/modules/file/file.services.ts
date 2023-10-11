import { jwtHelper } from "../../../helpers/jwtHelper";
import prisma from "../../../shared/prisma";
// import { IUserLogin } from "../user/user.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";
import { UserFile } from "@prisma/client";

// Create new user
const file_upload = async (req: Request): Promise<UserFile | null> => {
	const file = req.file as IUploadFile;
	const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

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
				user_id: "test",
			},
		});

		return created_file;
	}
	throw new ApiError(httpStatus.BAD_REQUEST, "Image not uploaded ");
};

export const FileServices = {
	file_upload,
};


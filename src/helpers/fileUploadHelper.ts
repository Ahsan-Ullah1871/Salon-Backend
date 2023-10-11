import { v2 as cloudinary } from "cloudinary";
let streamifier = require("streamifier");

import multer from "multer";
import * as fs from "fs";
import { ICloudinaryResponse, IUploadFile } from "../interfaces/file";
import config from "../config";

cloudinary.config({
	cloud_name: config.cloudinary.cloudName,
	api_key: config.cloudinary.apiKey,
	api_secret: config.cloudinary.apiSecret,
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
	file: IUploadFile
): Promise<ICloudinaryResponse | null> => {
	return new Promise((resolve, reject) => {
		let cld_upload_stream = cloudinary.uploader.upload_stream(
			{
				folder: "salon",
				display_name: file.originalname,
				original_filename: file.originalname,
			},
			(error: any, result: any) => {
				if (result) {
					resolve(result);
				} else {
					reject(error);
				}
			}
		);

		streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
	});
};

export const FileUploadHelper = {
	uploadToCloudinary,
	upload,
};

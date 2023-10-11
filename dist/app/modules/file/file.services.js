"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// import { IUserLogin } from "../user/user.interface";
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
// Create new user
const file_upload = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
    if (uploadedImage) {
        const created_file = yield prisma_1.default.userFile.create({
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
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Image not uploaded ");
});
exports.FileServices = {
    file_upload,
};

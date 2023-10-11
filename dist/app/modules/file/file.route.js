"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRoute = void 0;
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const file_controller_1 = require("./file.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/upload", 
// requestValidationHandler(user_signup_zod_schema),
fileUploadHelper_1.FileUploadHelper.upload.single("file"), file_controller_1.FileController.fileUpload);
exports.FileRoute = router;

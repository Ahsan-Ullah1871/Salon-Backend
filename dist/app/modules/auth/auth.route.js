"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const requestValidationHandler_1 = __importDefault(require("../../middlewares/requestValidationHandler"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/signup", (0, requestValidationHandler_1.default)(auth_validation_1.user_signup_zod_schema), auth_controller_1.AuthController.signupUser);
router.post("/signin", (0, requestValidationHandler_1.default)(auth_validation_1.user_signin_zod_schema), auth_controller_1.AuthController.loginUser);
exports.AuthRoute = router;

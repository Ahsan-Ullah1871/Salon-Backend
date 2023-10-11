import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { error_res_type } from "./interfaces/error";
import global_error_handler from "./app/middlewares/globalErrorHandler";
import SalonRoutes from "./routes/SalonRoutes";
import root_api_response from "./constant/RootApiResponse";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/salon", SalonRoutes);

// testing
app.get("/", (req, res) => {
	res.send(root_api_response);
});

// Global error
app.use(global_error_handler);

// Undefined error
app.use((req: Request, res: Response, next: NextFunction) => {
	const error_data: error_res_type = {
		success: false,
		message: "NOT FOUND",
		errorMessages: [
			{
				path: req.originalUrl,
				message: "Api not found ",
			},
		],
	};
	res.status(httpStatus.NOT_FOUND).json(error_data);

	next();
});

export default app;


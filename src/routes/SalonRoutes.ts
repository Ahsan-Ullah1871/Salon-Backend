import express from "express";
import { FileRoute } from "../app/modules/file/file.route";
import { AuthRoute } from "../app/modules/auth/auth.route";

const SalonRouter = express.Router();

const all_routes = [
	{ path: "/auth", router: AuthRoute },
	{ path: "/file", router: FileRoute },
];

all_routes.map((item) => SalonRouter.use(item.path, item.router));

export default SalonRouter;


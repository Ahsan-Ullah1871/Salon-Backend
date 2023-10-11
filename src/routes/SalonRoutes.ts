import express from "express";
import { FileRoute } from "../app/modules/file/file.route";
import { AuthRoute } from "../app/modules/auth/auth.route";
import { UserRoute } from "../app/modules/user/user.routes";

const SalonRouter = express.Router();

const all_routes = [
	{ path: "/auth", router: AuthRoute },
	{ path: "/file", router: FileRoute },
	{ path: "/user", router: UserRoute },
];

all_routes.map((item) => SalonRouter.use(item.path, item.router));

export default SalonRouter;


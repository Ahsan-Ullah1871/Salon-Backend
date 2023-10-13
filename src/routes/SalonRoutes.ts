import express from "express";
import { FileRoute } from "../app/modules/file/file.route";
import { AuthRoute } from "../app/modules/auth/auth.route";
import { UserRoute } from "../app/modules/user/user.routes";
import { CategoryRoute } from "../app/modules/category/category.routes";
import { ServiceRoute } from "../app/modules/service/service.routes";
import { ReviewRoute } from "../app/modules/review/review.routes";
import { BlogPostRoute } from "../app/modules/blog_post/blog_post.routes";
import { WorkerRoute } from "../app/modules/worker/worker.routes";
import { ScheduleRoute } from "../app/modules/schedule/schedule.routes";

const SalonRouter = express.Router();

const all_routes = [
	{ path: "/auth", router: AuthRoute },
	{ path: "/file", router: FileRoute },
	{ path: "/user", router: UserRoute },
	{ path: "/category", router: CategoryRoute },
	{ path: "/service", router: ServiceRoute },
	{ path: "/blog", router: BlogPostRoute },
	{ path: "/review", router: ReviewRoute },
	{ path: "/worker", router: WorkerRoute },
	{ path: "/schedule", router: ScheduleRoute },
];

all_routes.map((item) => SalonRouter.use(item.path, item.router));

export default SalonRouter;


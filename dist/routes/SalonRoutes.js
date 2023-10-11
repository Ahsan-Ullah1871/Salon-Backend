"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_route_1 = require("../app/modules/file/file.route");
const SalonRouter = express_1.default.Router();
const all_routes = [
    // { path: "/auth", router: AuthRoute },
    { path: "/file", router: file_route_1.FileRoute },
];
all_routes.map((item) => SalonRouter.use(item.path, item.router));
exports.default = SalonRouter;

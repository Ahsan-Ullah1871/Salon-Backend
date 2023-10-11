/* eslint-disable no-unused-expressions */

import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects } from "zod";

// requestValidationHandler
const requestValidationHandler: any =
	(schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
	async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
				cookies: req.cookies,
			});
			next();
		} catch (error) {
			next(error);
		}
	};
export default requestValidationHandler;


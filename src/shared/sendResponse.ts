import { Response } from "express";

type ISendResponse<T, K> = {
	status_code: number;
	message: string;
	success: boolean;
	meta?: K | null;
	data?: T | null;
	token?: string;
};

const sendResponse = <T, K>(res: Response, data: ISendResponse<T, K>): void => {
	let response_obj = data?.token
		? {
				success: data.success,
				message: data.message ?? "",
				statusCode: data.status_code,
				meta: data.meta || undefined,
				token: data.token || undefined,
		  }
		: {
				success: data.success,
				message: data.message ?? "",
				statusCode: data.status_code,
				meta: data.meta || undefined,
				data: data.data ?? null,
		  };

	res.status(data.status_code).json(response_obj);
};

export default sendResponse;


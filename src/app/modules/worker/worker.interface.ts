import { CV, Worker } from "@prisma/client";

export type IWorkerFilter = {
	id?: string;
	is_authorized?: boolean;
	user_id?: string;
	search?: string;
};

export type IWorkerDataWithCV = {
	worker_data: Worker;
	cv_data: CV;
};


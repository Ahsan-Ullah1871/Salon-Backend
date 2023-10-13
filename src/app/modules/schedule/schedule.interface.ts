import { CV } from "@prisma/client";

export type IScheduleFilter = {
	id?: string;
	available?: boolean;
	service_id?: string;
	provider_id?: string;
	search?: string;
};


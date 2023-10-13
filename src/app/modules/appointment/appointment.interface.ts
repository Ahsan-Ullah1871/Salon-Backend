import { CV } from "@prisma/client";

export type IAppointmentFilter = {
	id?: string;
	status?: boolean;
	service_id?: string;
	schedule_id?: string;
	user_id?: string;
	search?: string;
};


import { appointment_search_condition_keys } from "./appointment.constant";
import { IAppointmentFilter } from "./appointment.interface";

export const GetWhereConditions = (filters: IAppointmentFilter) => {
	const { search, ...filterData } = filters;
	const andConditions = [];

	if (search) {
		andConditions.push({
			OR: appointment_search_condition_keys.map((field) => ({
				[field]: {
					contains: search,
					mode: "insensitive",
				},
			})),
		});
	}

	if (Object.keys(filterData).length > 0) {
		andConditions.push({
			AND: Object.keys(filterData).map((key) => ({
				[key]: {
					equals: (filterData as any)[key],
				},
			})),
		});
	}

	return andConditions?.length > 0 ? { AND: andConditions } : {};
};


import { schedule_search_condition_keys } from "./schedule.constant";
import { IScheduleFilter } from "./schedule.interface";

export const GetWhereConditions = (filters: IScheduleFilter) => {
	const { search, ...filterData } = filters;
	const andConditions = [];

	if (search) {
		andConditions.push({
			OR: schedule_search_condition_keys.map((field) => ({
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


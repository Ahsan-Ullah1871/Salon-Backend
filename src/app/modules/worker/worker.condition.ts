import { worker_search_condition_keys } from "./worker.constant";
import { IWorkerFilter } from "./worker.interface";

export const GetWhereConditions = (filters: IWorkerFilter) => {
	const { search, ...filterData } = filters;
	const andConditions = [];

	if (search) {
		andConditions.push({
			OR: worker_search_condition_keys.map((field) => ({
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


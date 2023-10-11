export type IUser_role = "seller" | "buyer" | "admin";

export type ILocations =
	| "Dhaka"
	| "Chattogram"
	| "Barishal"
	| "Rajshahi"
	| "Sylhet"
	| "Comilla"
	| "Rangpur"
	| "Mymensingh";

export type IMeta = {
	page: number;
	size: number;
	total: number;
	totalPage: number;
};

export type GenericResponse<T> = {
	meta?: IMeta;
	data: T;
};


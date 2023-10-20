import { Schedule } from "@prisma/client";

export const schedule_search_condition_keys = [
	"id",
	"provider_id",
	"service_id",
];

export const schedule_filter_keys = [
	"id",
	"available",
	"service_id",
	"provider_id",
	"search",
	"date",
	"start_time",
	"end_time",
];

export function isNoOverlapWithinSameDate(
	startTime: Date,
	endTime: Date,
	schedules: Schedule[]
) {
	const date = startTime.toISOString().split("T")[0]; // Extract the date part

	// Check for overlapping schedules within the same date
	const isOverlap = schedules.some((schedule) => {
		const scheduleStartDateTime = new Date(schedule.start_time);
		const scheduleEndDateTime = new Date(schedule.end_time);

		return (
			date ===
				scheduleStartDateTime.toISOString().split("T")[0] &&
			startTime < scheduleEndDateTime &&
			endTime > scheduleStartDateTime
		);
	});

	return isOverlap;
}

export function isScheduleValid(schedule: Partial<Schedule>): boolean {
	const scheduleStartDateTime =
		schedule?.start_time && new Date(schedule.start_time);
	const scheduleEndDateTime =
		schedule?.end_time && new Date(schedule.end_time);

	// Check if the start time is chronologically earlier than the end time
	if (!scheduleStartDateTime || !scheduleEndDateTime) {
		return false;
	}
	const isChronological = scheduleStartDateTime < scheduleEndDateTime;

	return isChronological;
}


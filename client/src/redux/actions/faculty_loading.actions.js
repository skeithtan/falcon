// TermSchedules fetch
export const FACULTY_LOADING_TERM_SCHEDULES_IS_LOADING =
    "FACULTY_LOADING_TERM_SCHEDULES_IS_LOADING";
export const FACULTY_LOADING_TERM_SCHEDULES_IS_FETCHED =
    "FACULTY_LOADING_TERM_SCHEDULES_IS_FETCHED";
export const FACULTY_LOADING_TERM_SCHEDULES_FETCH_ERROR =
    "FACULTY_LOADING_TERM_SCHEDULES_FETCH_ERROR";

export const termSchedulesIsLoading = () => ({
    type: FACULTY_LOADING_TERM_SCHEDULES_IS_LOADING,
});

export const termSchedulesIsFetched = termSchedules => ({
    type: FACULTY_LOADING_TERM_SCHEDULES_IS_FETCHED,
    termSchedules,
});

export const termSchedulesFetchError = errors => ({
    type: FACULTY_LOADING_TERM_SCHEDULES_FETCH_ERROR,
    errors,
});

// TermSchedules CRUD
export const FACULTY_LOADING_TERM_SCHEDULE_IS_ADDED =
    "FACULTY_LOADING_TERM_SCHEDULE_IS_ADDED";
export const FACULTY_LOADING_TERM_SCHEDULE_IS_UPDATED =
    "FACULTY_LOADING_TERM_SCHEDULE_IS_UPDATED";

export const termScheduleIsAdded = termSchedule => ({
    type: FACULTY_LOADING_TERM_SCHEDULE_IS_ADDED,
    termSchedule,
});

export const termScheduleIsUpdated = termSchedule => ({
    type: FACULTY_LOADING_TERM_SCHEDULE_IS_UPDATED,
    termSchedule,
});

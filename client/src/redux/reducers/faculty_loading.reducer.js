import {
    FACULTY_LOADING_TERM_SCHEDULES_IS_LOADING,
    FACULTY_LOADING_TERM_SCHEDULES_IS_FETCHED,
    FACULTY_LOADING_TERM_SCHEDULES_FETCH_ERROR,
    FACULTY_LOADING_TERM_SCHEDULE_IS_ADDED,
    FACULTY_LOADING_TERM_SCHEDULE_IS_UPDATED,
} from "../actions/faculty_loading.actions";

const initialState = {
    termSchedules: null,
    isLoading: false,
    errors: null,
};

export function facultyLoading(state = initialState, action) {
    switch (action.type) {
        case FACULTY_LOADING_TERM_SCHEDULES_IS_LOADING:
            return {
                termSchedules: null,
                isLoading: true,
                errors: null,
            };
        case FACULTY_LOADING_TERM_SCHEDULES_IS_FETCHED:
            return {
                termSchedules: action.termSchedules,
                isLoading: false,
                errors: null,
            };
        case FACULTY_LOADING_TERM_SCHEDULES_FETCH_ERROR:
            return {
                termSchedules: null,
                isLoading: false,
                errors: action.errors,
            };
        case FACULTY_LOADING_TERM_SCHEDULE_IS_ADDED:
            const newArchived = [...state.termSchedules.archived];
            const current = state.termSchedules.current;

            // Move previously current to archived
            // Only if non-null, current is null if there are no termSchedules yet
            if (current) {
                newArchived.push(current);
            }

            return {
                ...state,
                termSchedules: {
                    current: action.termSchedule,
                    archived: newArchived,
                },
            };
        case FACULTY_LOADING_TERM_SCHEDULE_IS_UPDATED:
            return {
                ...state,
                termSchedules: {
                    current: action.termSchedule,
                    archived: [...state.termSchedules.archived],
                },
            };
        default:
            return state;
    }
}

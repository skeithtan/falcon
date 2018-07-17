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
            return {
                ...state,
                termSchedules: {
                    current: action.termSchedules,
                    // Move previously current to archived
                    archived: [
                        state.termSchedules.current,
                        ...state.termSchedules.archived,
                    ],
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

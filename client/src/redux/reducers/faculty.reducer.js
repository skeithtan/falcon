import {
    FACULTY_IS_ADDED,
    FACULTY_IS_UPDATED,
    FACULTY_LIST_FETCH_ERROR,
    FACULTY_LIST_IS_FETCHED,
    FACULTY_LIST_IS_LOADING,
} from "../actions/faculty.actions";

const initialState = {
    faculties: null,
    isLoading: false,
    errors: null,
};

export function faculty(state = initialState, action) {
    switch (action.type) {
        case FACULTY_LIST_IS_LOADING:
            return {
                faculties: null,
                isLoading: true,
                errors: null,
            };
        case FACULTY_LIST_FETCH_ERROR:
            return {
                faculties: null,
                isLoading: false,
                errors: action.errors,
            };
        case FACULTY_IS_ADDED:
            return {
                ...state,
                faculties: [...state.faculties, action.faculty],
            };
        case FACULTY_IS_UPDATED:
            const modifiedFaculty = action.faculty;

            // Replace the old with the new
            const faculties = state.faculties.map(faculty => {
                if (faculty._id === modifiedFaculty._id) {
                    return modifiedFaculty;
                }

                return faculty;
            });

            return {
                ...state,
                faculties: faculties,
            };
        case FACULTY_LIST_IS_FETCHED:
            return {
                faculties: action.faculties,
                errors: null,
                isLoading: false,
            };
        default:
            return state;
    }
}

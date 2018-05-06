import { SET_ERRORS, SET_FACULTIES, START_LOADING } from "../actions/faculty_list.actions";

const initialState = {
    faculties: null,
    isLoading: false,
    errors: null,
};

export default function facultyList(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: true,
                faculties: null,
                errors: null,
            };
        case SET_ERRORS:
            return {
                isLoading: false,
                faculties: null,
                errors: action.errors,
            };
        case SET_FACULTIES:
            return {
                isLoading: false,
                faculties: action.faculties,
                errors: null,
            };
        default:
            return state;
    }
}
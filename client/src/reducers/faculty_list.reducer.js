import {
    SET_ACTIVE_FACULTY,
    SET_ERRORS,
    SET_FACULTIES,
    SET_SEARCH_KEYWORD,
    START_LOADING,
} from "../actions/faculty_list.actions";

const initialState = {
    faculties: null,
    isLoading: false,
    errors: null,
    searchKeyword: "",
    activeFaculty: null,
};

export default function facultyList(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
                faculties: null,
                errors: null,
            };
        case SET_ERRORS:
            return {
                ...state,
                isLoading: false,
                faculties: null,
                errors: action.errors,
            };
        case SET_FACULTIES:
            return {
                ...state,
                isLoading: false,
                faculties: action.faculties,
                errors: null,
            };
        case SET_ACTIVE_FACULTY:
            return {
                ...state,
                activeFaculty: action.faculty,
            };
        case SET_SEARCH_KEYWORD:
            return {
                ...state,
                searchKeyword: action.searchKeyword,
            };
        default:
            return state;
    }
}
import {
    SET_ACTIVE_FACULTY,
    SET_ERRORS,
    SET_FACULTIES,
    SET_SEARCH_KEYWORD,
    START_LOADING,
    OVERVIEW_FETCH_ERROR,
    OVERVIEW_FETCHED,
    OVERVIEW_IS_LOADING,
    SET_ACTIVE_TAB,
} from "../actions/faculty_profiles.actions";
import { OVERVIEW_TAB } from "../pages/FacultyProfiles/detail_tabs";

const initialState = {
    faculties: null,
    activeFacultyId: null,
    searchKeyword: "",
    facultyList: {
        isLoading: false,
        errors: null,
    },
    activeTabIdentifier: OVERVIEW_TAB.identifier,
    overviewTab: {
        isLoading: true,
        overviewIsFetched: false,
        errors: null,
    },
};

export default function facultyProfiles(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                facultyList: {
                    isLoading: true,
                    errors: null,
                },
            };
        case SET_ERRORS:
            return {
                ...state,
                facultyList: {
                    isLoading: false,
                    errors: action.errors,
                },
            };
        case SET_FACULTIES:
            return {
                ...state,
                faculties: action.faculties,
                facultyList: {
                    errors: null,
                    isLoading: false,
                },
            };
        case SET_ACTIVE_FACULTY:
            return {
                ...state,
                activeFacultyId: action.faculty._id,
                overviewTab: initialState.overviewTab,
            };
        case SET_SEARCH_KEYWORD:
            return {
                ...state,
                searchKeyword: action.searchKeyword,
            };
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTabIdentifier: action.tab.identifier,
            };
        case OVERVIEW_IS_LOADING:
            return {
                ...state,
                overviewTab: {
                    isLoading: true,
                    overviewIsFetched: false,
                    errors: null,
                },
            };
        case OVERVIEW_FETCHED:
            return {
                ...state,
                overviewTab: {
                    isLoading: false,
                    overviewIsFetched: true,
                    errors: null,
                },
            };
        case OVERVIEW_FETCH_ERROR:
            return {
                ...state,
                overviewTab: {
                    isLoading: false,
                    overviewIsFetched: false,
                    errors: action.errors,
                },
            };
        default:
            return state;
    }
}
import {
    ACTIVE_FACULTY_CHANGED,
    PROFILES_FETCH_ERROR,
    PROFILES_FETCHED,
    SEARCH_KEYWORD_CHANGED,
    PROFILES_LIST_IS_LOADING,
    OVERVIEW_FETCH_ERROR,
    OVERVIEW_FETCHED,
    OVERVIEW_IS_LOADING,
    ACTIVE_TAB_CHANGED,
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
        case PROFILES_LIST_IS_LOADING:
            return {
                ...state,
                facultyList: {
                    isLoading: true,
                    errors: null,
                },
            };
        case PROFILES_FETCH_ERROR:
            return {
                ...state,
                facultyList: {
                    isLoading: false,
                    errors: action.errors,
                },
            };
        case PROFILES_FETCHED:
            return {
                ...state,
                faculties: action.faculties,
                facultyList: {
                    errors: null,
                    isLoading: false,
                },
            };
        case ACTIVE_FACULTY_CHANGED:
            return {
                ...state,
                activeFacultyId: action.faculty._id,
                overviewTab: initialState.overviewTab,
            };
        case SEARCH_KEYWORD_CHANGED:
            return {
                ...state,
                searchKeyword: action.searchKeyword,
            };
        case ACTIVE_TAB_CHANGED:
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
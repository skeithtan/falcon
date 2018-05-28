import {
    ACTIVE_FACULTY_CHANGED,
    DETAIL_ACTIVE_TAB_CHANGED,
    DETAIL_FETCH_ERROR,
    DETAILS_FETCHED,
    DETAILS_IS_LOADING,
    SEARCH_KEYWORD_CHANGED,
} from "../actions/faculty_profiles.actions";
import { OVERVIEW_TAB } from "../pages/FacultyProfiles/components/faculty_detail_tabs";


const initialState = {
    activeFacultyId: null,
    searchKeyword: "",
    activeTabIdentifier: OVERVIEW_TAB.identifier,
    facultyDetails: {
        isLoading: false,
        isFetched: false,
        errors: null,
    },
};
export function facultyProfiles(state = initialState, action) {
    switch (action.type) {
        case ACTIVE_FACULTY_CHANGED:
            return {
                ...state,
                activeFacultyId: action.faculty._id,
            };
        case SEARCH_KEYWORD_CHANGED:
            return {
                ...state,
                searchKeyword: action.searchKeyword,
            };
        case DETAIL_ACTIVE_TAB_CHANGED:
            return {
                ...state,
                activeTabIdentifier: action.tab.identifier,
            };
        case DETAILS_IS_LOADING:
            return {
                ...state,
                facultyDetails: {
                    isLoading: true,
                    isFetched: false,
                    errors: null,
                },
            };
        case DETAILS_FETCHED:
            return {
                ...state,
                facultyDetails: {
                    isLoading: false,
                    isFetched: true,
                    errors: null,
                },
            };
        case DETAIL_FETCH_ERROR:
            return {
                ...state,
                facultyDetails: {
                    isLoading: false,
                    isFetched: false,
                    errors: action.errors,
                },
            };
        default:
            return state;
    }
}
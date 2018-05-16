import {
    ACTIVE_FACULTY_CHANGED,
    ACTIVE_TAB_CHANGED,
    DETAIL_FETCH_ERROR,
    DETAILS_FETCHED,
    DETAILS_IS_LOADING,
    PROFILE_IS_ADDED, PROFILE_IS_UPDATED,
    PROFILES_FETCH_ERROR,
    PROFILES_FETCHED,
    PROFILES_LIST_IS_LOADING,
    SEARCH_KEYWORD_CHANGED,
} from "../actions/faculty_profiles.actions";
import { OVERVIEW_TAB } from "../pages/FacultyProfiles/components/faculty_detail_tabs";


const initialState = {
    faculties: null,
    activeFacultyId: null,
    searchKeyword: "",
    facultyList: {
        isLoading: false,
        errors: null,
    },
    activeTabIdentifier: OVERVIEW_TAB.identifier,
    facultyDetails: {
        isLoading: true,
        isFetched: false,
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
        case PROFILE_IS_ADDED:
            return {
                ...state,
                faculties: [...state.faculties, action.faculty],
            };
        case PROFILE_IS_UPDATED:
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
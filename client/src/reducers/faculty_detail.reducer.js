import {
    OVERVIEW_FETCH_ERROR,
    OVERVIEW_FETCHED,
    OVERVIEW_IS_LOADING,
    SET_ACTIVE_TAB,
} from "../actions/faculty_detail.actions";
import { OVERVIEW_TAB } from "../pages/FacultyProfiles/detail_tabs";

const initialState = {
    activeTabIdentifier: OVERVIEW_TAB.identifier,
    overviewTab: {
        isLoading: false,
        overviewIsFetched: false,
        errors: null,
    },
};

export default function facultyDetail(state = initialState, action) {
    switch (action.type) {
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
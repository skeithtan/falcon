import {
    SEARCH_KEYWORD_CHANGED,
} from "../actions/faculty_profiles.actions";


const initialState = {
    searchKeyword: "",
};

export function facultyProfiles(state = initialState, action) {
    switch (action.type) {
        case SEARCH_KEYWORD_CHANGED:
            return {
                ...state,
                searchKeyword: action.searchKeyword,
            };
        default:
            return state;
    }
}
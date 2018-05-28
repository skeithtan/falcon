import { FACULTY_LOADING_ACTIVE_TAB_CHANGED } from "../actions/faculty_loading.actions";
import { TERMS_SCHEDULE_TAB } from "../pages/FacultyLoading/tabs";


const initialState = {
    activeTabIdentifier: TERMS_SCHEDULE_TAB.identifier,
};

export function facultyLoading(state = initialState, action) {
    switch (action.type) {
        case FACULTY_LOADING_ACTIVE_TAB_CHANGED:
            return {
                activeTabIdentifier: action.tab.identifier,
            };
        default:
            return state;
    }
}
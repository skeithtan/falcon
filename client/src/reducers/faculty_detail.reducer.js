import { SET_ACTIVE_TAB } from "../actions/faculty_detail.actions";
import { DEGREES_TAB } from "../pages/FacultyProfiles/detail_tabs";

const initialState = {
    activeTabIdentifier: DEGREES_TAB.identifier,
};

export default function facultyDetail(state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return {
                activeTabIdentifier: action.tab.identifier,
            };
        default:
            return state;
    }
}
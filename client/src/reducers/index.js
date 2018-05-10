import { combineReducers } from "redux";
import { SIGN_OUT_SUCCESS } from "../actions/authentication.actions";
import authentication from "./authentication.reducer";
import facultyProfiles from "./faculty_profiles.reducer";
import pages from "./pages.reducer";


const appReducer = combineReducers({
    authentication,
    pages,
    facultyProfiles,
});

export default (state, action) => {
    if (action.type === SIGN_OUT_SUCCESS) {
        state = undefined;
    }

    return appReducer(state, action);
}
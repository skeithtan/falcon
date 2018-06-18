import { combineReducers } from "redux";
import { SIGN_OUT_SUCCESS } from "../actions/authentication.actions";
import { authentication } from "./authentication.reducer";
import { faculty } from "./faculty.reducer";
import { facultyProfiles } from "./faculty_profiles.reducer";
import { subject } from "./subject.reducer";
import { toast } from "./toast.reducer";


const appReducer = combineReducers({
    authentication,
    facultyProfiles,
    faculty,
    subject,
    toast,
});

export const reducer = (state, action) => {
    // Clear state on sign out
    if (action.type === SIGN_OUT_SUCCESS) {
        state = undefined;
    }

    return appReducer(state, action);
};
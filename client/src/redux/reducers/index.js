import { combineReducers } from "redux";
import { SIGN_OUT_SUCCESS } from "../actions/authentication.actions";
import { authentication } from "./authentication.reducer";
import { changeRequests } from "./change_requests.reducer";
import { faculty } from "./faculty.reducer";
import { facultyProfiles } from "./faculty_profiles.reducer";
import { myProfile } from "./my_profile.reducer";
import { subject } from "./subject.reducer";
import { toast } from "./toast.reducer";
import { facultyLoading } from "./faculty_loading.reducer";

const appReducer = combineReducers({
    authentication,
    facultyProfiles,
    faculty,
    subject,
    myProfile,
    toast,
    changeRequests,
    facultyLoading,
});

export const reducer = (state, action) => {
    // Clear state on sign out
    if (action.type === SIGN_OUT_SUCCESS) {
        state = undefined;
    }

    return appReducer(state, action);
};

import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import pages from "./pages.reducer";
import facultyProfiles from "./faculty_profiles.reducer";


export default combineReducers({
    authentication,
    pages,
    facultyProfiles,
});
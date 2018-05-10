import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import facultyProfiles from "./faculty_profiles.reducer";
import pages from "./pages.reducer";


export default combineReducers({
    authentication,
    pages,
    facultyProfiles,
});
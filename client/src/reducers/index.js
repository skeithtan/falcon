import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import pages from "./pages.reducer";
import facultyList from "./faculty_list.reducer";


export default combineReducers({
    authentication,
    pages,
    facultyList,
});
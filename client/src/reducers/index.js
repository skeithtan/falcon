import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import pages from "./pages.reducer";


export default combineReducers({
    authentication,
    pages,
});
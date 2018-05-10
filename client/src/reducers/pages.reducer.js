import { PAGE_IS_CHANGED } from "../actions/pages.actions";
import { HOME_PAGE } from "../pages";


const initialState = {
    activePageIdentifier: HOME_PAGE.identifier,
};
export default function pages(state = initialState, action = {}) {
    switch (action.type) {
        case PAGE_IS_CHANGED:
            return {
                activePageIdentifier: action.page.identifier,
            };
        default:
            return state;
    }
}
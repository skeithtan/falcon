import { SET_ACTIVE_PAGE } from "../actions/pages.actions";
import { HOME_PAGE } from "../pages/pages";


const initialState = {
    activePageIdentifier: HOME_PAGE.identifier,
};

export default function pages(state = initialState, action = {}) {
    switch (action.type) {
        case SET_ACTIVE_PAGE:
            return {
                activePageIdentifier: action.page.identifier,
            };
        default:
            return state;
    }
}
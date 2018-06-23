import {
    CHANGE_REQUEST_FETCH_ERROR,
    CHANGE_REQUEST_IS_ADDED,
    CHANGE_REQUEST_IS_DISMISSED,
    CHANGE_REQUEST_IS_FETCHED,
    CHANGE_REQUEST_IS_LOADING,
} from "../actions/change_requests.actions";


const initialState = {
    changeRequests: null,
    isLoading: false,
    errors: null,
};

export function changeRequests(state = initialState, action) {
    switch (action.type) {
        case CHANGE_REQUEST_IS_ADDED:
            return {
                ...state,
                changeRequests: [...state.changeRequests, action.changeRequest],
            };
        case CHANGE_REQUEST_IS_DISMISSED:
            return {
                ...state,
                changeRequests: state.changeRequests.filter(changeRequest => (
                    changeRequest._id !== action.changeRequest._id
                )),
            };
        case CHANGE_REQUEST_IS_FETCHED:
            return {
                ...state,
                changeRequests: action.changeRequests,
                isLoading: false,
                errors: null,
            };
        case CHANGE_REQUEST_IS_LOADING:
            return {
                ...state,
                isLoading: true,
                errors: null,
            };
        case CHANGE_REQUEST_FETCH_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.errors,
            };
        default:
            return state;
    }
}
import { normalizeChangeRequests } from "../../utils/change_request.util";
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
    let newState;

    switch (action.type) {
        case CHANGE_REQUEST_IS_ADDED:
            // In case changeRequests hasn't been fetched yet
            if (!state.changeRequests) {
                return state;
            }

            newState = {
                ...state,
                changeRequests: {
                    ...state.changeRequests,
                },
            };

            if (state.changeRequests[action.facultyId]) {
                newState.changeRequests[action.facultyId].push(action.changeRequest);
            } else {
                newState.changeRequests[action.facultyId] = [action.changeRequest];
            }

            return newState;
        case CHANGE_REQUEST_IS_DISMISSED:
            if (!state.changeRequests) {
                return state;
            }

            newState = {
                ...state,
                changeRequests: {
                    ...state.changeRequests,
                },
            };

            const facultyChangeRequests = newState.changeRequests[action.facultyId];
            newState.changeRequests[action.facultyId] = facultyChangeRequests.filter(changeRequest =>
                changeRequest._id !== action.changeRequest._id,
            );

            return newState;
        case CHANGE_REQUEST_IS_FETCHED:
            return {
                ...state,
                changeRequests: normalizeChangeRequests(action.changeRequests),
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
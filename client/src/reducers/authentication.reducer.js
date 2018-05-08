import {
    SIGN_IN_SUCCESS,
    SIGN_IN_IS_LOADING,
    SIGN_IN_ERROR,
    SIGN_OUT_SUCCESS,
} from "../actions/authentication.actions";


const hasToken = localStorage.hasOwnProperty("token");
const hasUser = localStorage.hasOwnProperty("user");

const initialState = {
    isAuthenticated: hasToken,
    isLoading: false,
    signInError: null,
    user: hasUser ? JSON.parse(localStorage.user) : null,
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                isAuthenticated: action.user !== null,
                isLoading: false,
                signInError: null,
                user: action.user,
            };
        case SIGN_IN_IS_LOADING:
            return {
                isAuthenticated: false,
                isLoading: true,
                signInError: null,
                user: null,
            };
        case SIGN_IN_ERROR:
            return {
                isAuthenticated: false,
                isLoading: false,
                signInError: action.error,
                user: null,
            };
        case SIGN_OUT_SUCCESS:
            return {
                isAuthenticated: false,
                isLoading: false,
                signInError: null,
                user: null,
            };
        default:
            return state;
    }
}
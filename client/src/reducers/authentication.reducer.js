import { SET_CURRENT_USER, ATTEMPT_SIGN_IN, SET_SIGN_IN_ERROR } from "../actions/authentication.actions";


const hasToken = localStorage.hasOwnProperty("token");
const hasUser = localStorage.hasOwnProperty("user");

const initialState = {
    isAuthenticated: hasToken,
    attemptingSignIn: false,
    signInError: null,
    user: hasUser ? JSON.parse(localStorage.user) : null,
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: action.user !== null,
                attemptingSignIn: false,
                signInError: null,
                user: action.user,
            };
        case ATTEMPT_SIGN_IN:
            return {
                isAuthenticated: false,
                attemptingSignIn: true,
                signInError: null,
                user: null,
            };
        case SET_SIGN_IN_ERROR:
            return {
                isAuthenticated: false,
                attemptingSignIn: false,
                signInError: action.error,
                user: null,
            };
        default:
            return state;
    }
}
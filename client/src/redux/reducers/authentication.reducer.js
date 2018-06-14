import { getPermissions } from "../../utils/user.util";
import {
    SIGN_IN_ERROR,
    SIGN_IN_IS_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS,
} from "../actions/authentication.actions";


const getUser = () => {
    if (!localStorage.hasOwnProperty("user")) {
        return null;
    }

    const user = JSON.parse(localStorage.user);
    user.permissions = getPermissions(user);
    return user;
};

const initialState = {
    isLoading: false,
    signInError: null,
    user: getUser(),
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                isLoading: false,
                signInError: null,
                user: action.user,
            };
        case SIGN_IN_IS_LOADING:
            return {
                isLoading: true,
                signInError: null,
                user: null,
            };
        case SIGN_IN_ERROR:
            return {
                isLoading: false,
                signInError: action.error,
                user: null,
            };
        case SIGN_OUT_SUCCESS:
            return {
                isLoading: false,
                signInError: null,
                user: null,
            };
        default:
            return state;
    }
}
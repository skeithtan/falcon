import { getPermissions } from "../../utils/user.util";
import {
    CHANGE_PASSWORD_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_IN_IS_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS,
} from "../actions/authentication.actions";


const getUserFromLocalStorage = () => {
    if (!localStorage.hasOwnProperty("user")) {
        return null;
    }

    const user = JSON.parse(localStorage.user);
    return getUserWithPermissions(user);
};

const getUserWithPermissions = user => {
    user.permissions = getPermissions(user);
    return user;
};

const initialState = {
    isLoading: false,
    signInError: null,
    user: getUserFromLocalStorage(),
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                isLoading: false,
                signInError: null,
                user: getUserWithPermissions(action.user),
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
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    temporaryPassword: false,
                },
            };
        default:
            return state;
    }
}
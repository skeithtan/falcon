export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_IN_IS_LOADING = "SIGN_IN_IS_LOADING";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";

export function signInSuccess(user) {
    return {
        type: SIGN_IN_SUCCESS,
        user,
    };
}

export function signInError(error) {
    return {
        type: SIGN_IN_ERROR,
        error,
    };
}

export function signInIsLoading() {
    return {
        type: SIGN_IN_IS_LOADING,
    };
}

export function signOutSuccess() {
    return {
        type: SIGN_OUT_SUCCESS,
    };
}

export function changePasswordSuccess() {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
    };
}
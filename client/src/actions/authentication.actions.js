export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_SIGN_IN_ERROR = "SET_SIGN_IN_ERROR";
export const ATTEMPT_SIGN_IN = "ATTEMPT_SIGN_IN";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user,
    };
}

export function setSignInError(error) {
    return {
        type: SET_SIGN_IN_ERROR,
        error,
    };
}

export function attemptSignIn() {
    return {
        type: ATTEMPT_SIGN_IN,
    };
}
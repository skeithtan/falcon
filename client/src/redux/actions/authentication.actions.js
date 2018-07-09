export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_IN_IS_LOADING = "SIGN_IN_IS_LOADING";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";

export const signInSuccess = user => ({
    type: SIGN_IN_SUCCESS,
    user,
});

export const signInError = error => ({
    type: SIGN_IN_ERROR,
    error,
});

export const signInIsLoading = () => ({
    type: SIGN_IN_IS_LOADING,
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS,
});

export const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD_SUCCESS,
});
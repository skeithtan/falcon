export const TOAST_IS_SHOWING = "TOAST_IS_SHOWING";
export const TOAST_IS_DISMISSED = "TOAST_IS_DISMISSED";

export const toastIsShowing = toastMessage => ({
    type: TOAST_IS_SHOWING,
    toastMessage,
});

export const toastIsDismissed = () => ({
    type: TOAST_IS_DISMISSED,
});
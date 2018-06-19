export const TOAST_IS_SHOWING = "TOAST_IS_SHOWING";
export const TOAST_IS_DISMISSED = "TOAST_IS_DISMISSED";

export function toastIsShowing(toastMessage) {
    return {
        type: TOAST_IS_SHOWING,
        toastMessage,
    };
}

export function toastIsDismissed() {
    return {
        type: TOAST_IS_DISMISSED,
    };
}
import { TOAST_IS_DISMISSED, TOAST_IS_SHOWING } from "../actions/toast.actions";


const initialState = {
    isShowing: false,
    message: null,
};

export function toast(state = initialState, action) {
    switch (action.type) {
        case TOAST_IS_SHOWING:
            return {
                isShowing: true,
                message: action.toastMessage,
            };
        case TOAST_IS_DISMISSED:
            return {
                isShowing: false,
                message: null,
            };
        default:
            return state;
    }
}
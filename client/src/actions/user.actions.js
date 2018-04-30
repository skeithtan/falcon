export const SET_CURRENT_USER = "SET_CURRENT_USER";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user,
    };
}
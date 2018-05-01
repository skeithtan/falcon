export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

export function setActivePage(page) {
    return {
        type: SET_ACTIVE_PAGE,
        page,
    };
}
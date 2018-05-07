export const SET_ACTIVE_TAB = "SET_CURRENT_TAB";

export function setActiveTab(tab) {
    return {
        type: SET_ACTIVE_TAB,
        tab
    }
}
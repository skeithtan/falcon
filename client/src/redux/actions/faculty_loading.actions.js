export const FACULTY_LOADING_ACTIVE_TAB_CHANGED = "FACULTY_LOADING_ACTIVE_TAB_CHANGED";

export function facultyLoadingActiveTabChanged(tab) {
    return {
        type: FACULTY_LOADING_ACTIVE_TAB_CHANGED,
        tab,
    };
}
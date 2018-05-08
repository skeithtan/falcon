export const SET_ACTIVE_TAB = "SET_CURRENT_TAB";
export const OVERVIEW_IS_LOADING = "OVERVIEW_IS_LOADING";
export const OVERVIEW_FETCHED = "OVERVIEW_FETCHED";
export const OVERVIEW_FETCH_ERROR = "OVERVIEW_FETCH_ERROR";

export function setActiveTab(tab) {
    return {
        type: SET_ACTIVE_TAB,
        tab,
    };
}

export function overviewIsLoading() {
    return {
        type: OVERVIEW_IS_LOADING,
    };
}

export function overviewFetched() {
    return {
        type: OVERVIEW_FETCHED,
    };
}

export function overviewFetchError(errors) {
    return {
        type: OVERVIEW_FETCH_ERROR,
        errors,
    };
}
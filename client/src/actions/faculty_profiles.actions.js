export const PROFILES_LIST_IS_LOADING = "PROFILES_LIST_IS_LOADING";
export const PROFILES_FETCHED = "PROFILES_FETCHED";
export const PROFILES_FETCH_ERROR = "PROFILES_FETCH_ERROR";
export const SEARCH_KEYWORD_CHANGED = "SEARCH_KEYWORD_CHANGED";
export const ACTIVE_FACULTY_CHANGED = "ACTIVE_FACULTY_CHANGED";
export const ACTIVE_TAB_CHANGED = "SET_CURRENT_TAB";
export const OVERVIEW_IS_LOADING = "OVERVIEW_IS_LOADING";
export const OVERVIEW_FETCHED = "OVERVIEW_FETCHED";
export const OVERVIEW_FETCH_ERROR = "OVERVIEW_FETCH_ERROR";


export function profilesListIsLoading(isLoading) {
    return {
        type: PROFILES_LIST_IS_LOADING,
    };
}

export function profilesFetched(faculties) {
    return {
        type: PROFILES_FETCHED,
        faculties,
    };
}

export function profilesFetchError(errors) {
    return {
        type: PROFILES_FETCH_ERROR,
        errors,
    };
}

export function activeFacultyChanged(faculty) {
    return {
        type: ACTIVE_FACULTY_CHANGED,
        faculty,
    };
}

export function searchKeywordChanged(searchKeyword) {
    return {
        type: SEARCH_KEYWORD_CHANGED,
        searchKeyword,
    };
}

export function activeTabChanged(tab) {
    return {
        type: ACTIVE_TAB_CHANGED,
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
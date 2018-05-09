export const PROFILES_LIST_IS_LOADING = "PROFILES_LIST_IS_LOADING";
export const PROFILES_FETCHED = "PROFILES_FETCHED";
export const PROFILES_FETCH_ERROR = "PROFILES_FETCH_ERROR";
export const SEARCH_KEYWORD_CHANGED = "SEARCH_KEYWORD_CHANGED";
export const ACTIVE_FACULTY_CHANGED = "ACTIVE_FACULTY_CHANGED";
export const ACTIVE_TAB_CHANGED = "SET_CURRENT_TAB";
export const DETAILS_IS_LOADING = "DETAILS_IS_LOADING";
export const DETAILS_FETCHED = "DETAILS_FETCHED";
export const DETAIL_FETCH_ERROR = "DETAIL_FETCH_ERROR";


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

export function detailsIsLoading() {
    return {
        type: DETAILS_IS_LOADING,
    };
}

export function detailFetched() {
    return {
        type: DETAILS_FETCHED,
    };
}

export function detailFetchError(errors) {
    return {
        type: DETAIL_FETCH_ERROR,
        errors,
    };
}
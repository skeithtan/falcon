export const START_LOADING = "START_LOADING";
export const SET_FACULTIES = "SET_FACULTIES";
export const SET_ERRORS = "SET_ERRORS";
export const SET_SEARCH_KEYWORD = "SET_SEARCH_KEYWORD";
export const SET_ACTIVE_FACULTY = "SET_ACTIVE_FACULTY";
export const SET_ACTIVE_TAB = "SET_CURRENT_TAB";
export const OVERVIEW_IS_LOADING = "OVERVIEW_IS_LOADING";
export const OVERVIEW_FETCHED = "OVERVIEW_FETCHED";
export const OVERVIEW_FETCH_ERROR = "OVERVIEW_FETCH_ERROR";


export function startLoading(isLoading) {
    return {
        type: START_LOADING,
    };
}

export function setFaculties(faculties) {
    return {
        type: SET_FACULTIES,
        faculties,
    };
}

export function setErrors(errors) {
    return {
        type: SET_ERRORS,
        errors,
    };
}

export function setActiveFaculty(faculty) {
    return {
        type: SET_ACTIVE_FACULTY,
        faculty,
    };
}

export function setSearchKeyword(searchKeyword) {
    return {
        type: SET_SEARCH_KEYWORD,
        searchKeyword,
    };
}

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
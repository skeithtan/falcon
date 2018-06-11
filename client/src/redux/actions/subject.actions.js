export const SUBJECT_LIST_IS_LOADING = "SUBJECT_LIST_IS_LOADING";
export const SUBJECT_LIST_IS_FETCHED = "SUBJECT_LIST_IS_FETCHED";
export const SUBJECT_IS_ADDED = "SUBJECT_IS_ADDED";
export const SUBJECT_IS_UPDATED = "SUBJECT_IS_UPDATED";
export const SUBJECT_LIST_FETCH_ERROR = "SUBJECT_LIST_FETCH_ERROR";
export const SEARCH_KEYWORD_CHANGED = "SUBJECT_LIST_SEARCH_KEYWORD_CHANGED";

export function searchKeywordChanged(searchKeyword) {
    return {
        type: SEARCH_KEYWORD_CHANGED,
        searchKeyword,
    };
}

export function subjectListIsLoading() {
    return {
        type: SUBJECT_LIST_IS_LOADING,
    };
}

export function subjectListIsFetched(subjects) {
    return {
        type: SUBJECT_LIST_IS_FETCHED,
        subjects,
    };
}

export function subjectIsAdded(subject) {
    return {
        type: SUBJECT_IS_ADDED,
        subject,
    };
}

export function subjectIsUpdated(subject) {
    return {
        type: SUBJECT_IS_UPDATED,
        subject,
    };
}

export function subjectListFetchError(errors) {
    return {
        type: SUBJECT_LIST_FETCH_ERROR,
        errors,
    };
}
// Subjects fetch
export const SUBJECT_LIST_IS_LOADING = "SUBJECT_LIST_IS_LOADING";
export const SUBJECT_LIST_IS_FETCHED = "SUBJECT_LIST_IS_FETCHED";
export const SUBJECT_LIST_FETCH_ERROR = "SUBJECT_LIST_FETCH_ERROR";

export const subjectListIsLoading = () => ({
    type: SUBJECT_LIST_IS_LOADING,
});

export const subjectListIsFetched = subjects => ({
    type: SUBJECT_LIST_IS_FETCHED,
    subjects,
});

export const subjectListFetchError = errors => ({
    type: SUBJECT_LIST_FETCH_ERROR,
    errors,
});

// Subjects CRUD
export const SUBJECT_IS_ADDED = "SUBJECT_IS_ADDED";
export const SUBJECT_IS_UPDATED = "SUBJECT_IS_UPDATED";
export const SEARCH_KEYWORD_CHANGED = "SUBJECT_LIST_SEARCH_KEYWORD_CHANGED";

export const searchKeywordChanged = searchKeyword => ({
    type: SEARCH_KEYWORD_CHANGED,
    searchKeyword,
});

export const subjectIsAdded = subject => ({
    type: SUBJECT_IS_ADDED,
    subject,
});

export const subjectIsUpdated = subject => ({
    type: SUBJECT_IS_UPDATED,
    subject,
});

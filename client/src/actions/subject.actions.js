export const SUBJECT_LIST_IS_LOADING = "FACULTY_LIST_IS_LOADING";
export const SUBJECT_LIST_IS_FETCHED = "FACULTY_LIST_IS_FETCHED";
export const SUBJECT_IS_ADDED = "FACULTY_IS_ADDED";
export const SUBJECT_IS_UPDATED = "FACULTY_IS_UPDATED";
export const SUBJECT_LIST_FETCH_ERROR = "FACULTIES_LIST_FETCH_ERROR";

export function subjectListIsLoading() {
    return {
        type: SUBJECT_LIST_IS_LOADING,
    };
}

export function subjectListIsFetched(faculties) {
    return {
        type: SUBJECT_LIST_IS_FETCHED,
        faculties,
    };
}

export function subjectIsAdded(faculty) {
    return {
        type: SUBJECT_IS_ADDED,
        faculty,
    };
}

export function subjectIsUpdated(faculty) {
    return {
        type: SUBJECT_IS_UPDATED,
        faculty,
    };
}

export function subjectListFetchError(errors) {
    return {
        type: SUBJECT_LIST_FETCH_ERROR,
        errors,
    };
}
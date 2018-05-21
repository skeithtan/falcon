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
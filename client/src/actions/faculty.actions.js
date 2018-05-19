export const FACULTY_LIST_IS_LOADING = "FACULTY_LIST_IS_LOADING";
export const FACULTY_LIST_IS_FETCHED = "FACULTY_LIST_IS_FETCHED";
export const FACULTY_IS_ADDED = "FACULTY_IS_ADDED";
export const FACULTY_IS_UPDATED = "FACULTY_IS_UPDATED";
export const FACULTY_LIST_FETCH_ERROR = "FACULTY_LIST_FETCH_ERROR";

export function facultyListIsLoading() {
    return {
        type: FACULTY_LIST_IS_LOADING,
    };
}

export function facultyListIsFetched(faculties) {
    return {
        type: FACULTY_LIST_IS_FETCHED,
        faculties,
    };
}

export function facultyIsAdded(faculty) {
    return {
        type: FACULTY_IS_ADDED,
        faculty,
    };
}

export function facultyIsUpdated(faculty) {
    return {
        type: FACULTY_IS_UPDATED,
        faculty,
    };
}

export function facultyListFetchError(errors) {
    return {
        type: FACULTY_LIST_FETCH_ERROR,
        errors,
    };
}
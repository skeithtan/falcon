// Faculty fetch
export const FACULTY_LIST_IS_LOADING = "FACULTY_LIST_IS_LOADING";
export const FACULTY_LIST_IS_FETCHED = "FACULTY_LIST_IS_FETCHED";
export const FACULTY_LIST_FETCH_ERROR = "FACULTY_LIST_FETCH_ERROR";

export const facultyListIsLoading = () => ({
    type: FACULTY_LIST_IS_LOADING,
});

export const facultyListIsFetched = faculties => ({
    type: FACULTY_LIST_IS_FETCHED,
    faculties,
});

export const facultyListFetchError = errors => ({
    type: FACULTY_LIST_FETCH_ERROR,
    errors,
});

// Faculty CRUD
export const FACULTY_IS_ADDED = "FACULTY_IS_ADDED";
export const FACULTY_IS_UPDATED = "FACULTY_IS_UPDATED";

export const facultyIsAdded = faculty => ({
    type: FACULTY_IS_ADDED,
    faculty,
});

export const facultyIsUpdated = faculty => ({
    type: FACULTY_IS_UPDATED,
    faculty,
});
// ChangeRequest fetch
export const CHANGE_REQUEST_IS_LOADING = "CHANGE_REQUEST_IS_LOADING";
export const CHANGE_REQUEST_FETCH_ERROR = "CHANGE_REQUEST_FETCH_ERROR";
export const CHANGE_REQUEST_IS_FETCHED = "CHANGE_REQUEST_IS_FETCHED";

export const changeRequestsIsLoading = () => ({
    type: CHANGE_REQUEST_IS_LOADING,
});

export const changeRequestFetchError = errors => ({
    type: CHANGE_REQUEST_FETCH_ERROR,
    errors,
});

export const changeRequestIsFetched = changeRequests => ({
    type: CHANGE_REQUEST_IS_FETCHED,
    changeRequests,
});

// ChangeRequest CRUD
export const CHANGE_REQUEST_IS_UPDATED = "CHANGE_REQUEST_IS_UPDATED";
export const CHANGE_REQUEST_IS_ADDED = "CHANGE_REQUEST_IS_ADDED";
export const CHANGE_REQUEST_IS_DISMISSED = "CHANGE_REQUEST_IS_DISMISSED";

export const changeRequestIsAdded = (changeRequest, facultyId) => ({
    type: CHANGE_REQUEST_IS_ADDED,
    changeRequest,
    facultyId,
});

export const changeRequestIsUpdated = (changeRequest, facultyId) => ({
    type: CHANGE_REQUEST_IS_UPDATED,
    changeRequest,
    facultyId,
});

export const changeRequestIsDismissed = (changeRequest, facultyId) => ({
    type: CHANGE_REQUEST_IS_DISMISSED,
    changeRequest,
    facultyId,
});

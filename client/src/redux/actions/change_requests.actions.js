export const CHANGE_REQUEST_IS_ADDED = "CHANGE_REQUEST_IS_ADDED";
export const CHANGE_REQUEST_IS_DISMISSED = "CHANGE_REQUEST_IS_DISMISSED";
export const CHANGE_REQUEST_IS_LOADING = "CHANGE_REQUEST_IS_LOADING";
export const CHANGE_REQUEST_FETCH_ERROR = "CHANGE_REQUEST_FETCH_ERROR";
export const CHANGE_REQUEST_IS_FETCHED = "CHANGE_REQUEST_IS_FETCHED";

export function changeRequestIsFetched(changeRequests) {
    return {
        type: CHANGE_REQUEST_IS_FETCHED,
        changeRequests,
    };
}

export function changeRequestIsAdded(changeRequest) {
    return {
        type: CHANGE_REQUEST_IS_ADDED,
        changeRequest,
    };
}

export function changeRequestIsDismissed(changeRequest) {
    return {
        type: CHANGE_REQUEST_IS_DISMISSED,
        changeRequest,
    };
}

export function changeRequestsIsLoading() {
    return {
        type: CHANGE_REQUEST_IS_LOADING,
    };
}

export function changeRequestFetchError(errors) {
    return {
        type: CHANGE_REQUEST_FETCH_ERROR,
        errors,
    };
}
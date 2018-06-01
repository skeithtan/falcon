export const SEARCH_KEYWORD_CHANGED = "SEARCH_KEYWORD_CHANGED";
export const DETAILS_IS_LOADING = "DETAILS_IS_LOADING";
export const DETAILS_FETCHED = "DETAILS_FETCHED";
export const DETAIL_FETCH_ERROR = "DETAIL_FETCH_ERROR";

export function searchKeywordChanged(searchKeyword) {
    return {
        type: SEARCH_KEYWORD_CHANGED,
        searchKeyword,
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
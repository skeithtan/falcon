export const MY_PROFILE_IS_FETCHED = "MY_PROFILE_FETCHED";
export const MY_PROFILE_FETCH_ERROR = "MY_PROFILE_FETCH_ERROR";
export const MY_PROFILE_IS_LOADING = "MY_PROFILE_IS_LOADING";

export function myProfileIsFetched(profile) {
    return {
        type: MY_PROFILE_IS_FETCHED,
        profile,
    };
}

export function myProfileFetchError(errors) {
    return {
        type: MY_PROFILE_FETCH_ERROR,
        errors,
    };
}

export function myProfileIsLoading() {
    return {
        type: MY_PROFILE_IS_LOADING,
    };
}
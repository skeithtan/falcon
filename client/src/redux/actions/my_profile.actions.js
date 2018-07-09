export const MY_PROFILE_IS_FETCHED = "MY_PROFILE_FETCHED";
export const MY_PROFILE_FETCH_ERROR = "MY_PROFILE_FETCH_ERROR";
export const MY_PROFILE_IS_LOADING = "MY_PROFILE_IS_LOADING";

export const myProfileIsFetched = profile => ({
    type: MY_PROFILE_IS_FETCHED,
    profile,
});

export const myProfileFetchError = errors => ({
    type: MY_PROFILE_FETCH_ERROR,
    errors,
});

export const myProfileIsLoading = () => ({
    type: MY_PROFILE_IS_LOADING,
});
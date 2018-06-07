import { MY_PROFILE_FETCH_ERROR, MY_PROFILE_IS_FETCHED, MY_PROFILE_IS_LOADING } from "../actions/my_profile.actions";


const initialState = {
    profile: null,
    isLoading: false,
    errors: null,
};

export function myProfile(state = initialState, action) {
    switch (action.type) {
        case MY_PROFILE_IS_LOADING:
            return {
                profile: null,
                isLoading: true,
                errors: null,
            };
        case MY_PROFILE_FETCH_ERROR:
            return {
                profile: null,
                isLoading: false,
                errors: action.errors,
            };
        case MY_PROFILE_IS_FETCHED:
            return {
                profile: action.profile,
                isLoading: false,
                errors: action.errors,
            };
        default:
            return state;
    }
}
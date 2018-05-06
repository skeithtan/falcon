export const START_LOADING = "START_LOADING";
export const SET_FACULTIES = "SET_FACULTIES";
export const SET_ERRORS = "SET_ERRORS";

export function startLoading(isLoading) {
    return {
        type: START_LOADING,
    };
}

export function setFaculties(faculties) {
    return {
        type: SET_FACULTIES,
        faculties,
    };
}

export function setErrors(errors) {
    return {
        type: SET_ERRORS,
        errors,
    };
}
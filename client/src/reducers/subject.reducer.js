import {
    SUBJECT_IS_ADDED,
    SUBJECT_IS_UPDATED,
    SUBJECT_LIST_FETCH_ERROR,
    SUBJECT_LIST_IS_FETCHED,
    SUBJECT_LIST_IS_LOADING,
} from "../actions/subject.actions";


const initialState = {
    subjects: null,
    isLoading: false,
    errors: null,
};

export function subject(state = initialState, action) {
    switch (action.type) {
        case SUBJECT_LIST_IS_LOADING:
            return {
                subjects: null,
                isLoading: true,
                errors: null,
            };
        case SUBJECT_LIST_FETCH_ERROR:
            return {
                subjects: null,
                isLoading: false,
                errors: action.errors
            };
        case SUBJECT_IS_ADDED:
            return {
                ...state,
                subjects: [...state.subjects, action.subject],
            };
        case SUBJECT_IS_UPDATED:
            const modifiedSubject = action.subject;

            // Replace the old with the new
            const subjects = state.subjects.map(subject => {
                if (subject._id === modifiedSubject._id) {
                    return modifiedSubject;
                }

                return subject;
            });

            return {
                ...state,
                subjects: subjects,
            };
        case SUBJECT_LIST_IS_FETCHED:
            return {
                subjects: action.subjects,
                errors: null,
                isLoading: false
            };
        default:
            return state
    }
}
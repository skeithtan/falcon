import moment from "moment";
import {
    facultyListFetchError,
    facultyListIsFetched,
    facultyListIsLoading,
} from "../redux/actions/faculty.actions";
import { SEX } from "../enums/faculty.enums";
import { fetchAllFaculties } from "../services/faculty/faculty";

export const initiatefetchAllFaculties = dispatch => {
    dispatch(facultyListIsLoading());
    return fetchAllFaculties()
        .then(result => {
            if (result.data) {
                dispatch(facultyListIsFetched(result.data.faculties));
            }
            if (result.errors) {
                dispatch(facultyListFetchError(result.errors));
            }
        })
        .catch(error => {
            dispatch(facultyListFetchError([error.message]));
        });
};

export function getPossessivePronoun(faculty) {
    return faculty.sex === SEX.M.identifier ? "his" : "her";
}

export function getObjectivePronoun(faculty) {
    return faculty.sex === SEX.M.identifier ? "him" : "her";
}

export function getPersonalPronoun(faculty) {
    return faculty.sex === SEX.M.identifier ? "he" : "she";
}

export function formatMonthYearDate(date) {
    const dateString = `${date.month}-${date.year}`;
    return moment(dateString, "MM-YYYY").format("MMMM Y");
}

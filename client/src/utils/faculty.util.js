import moment from "moment";
import { facultyListFetchError, facultyListIsFetched, facultyListIsLoading } from "../actions/faculty.actions";
import { SEX } from "../enums/faculty.enums";
import { fetchAllFacultiesSummary } from "../services/faculty/faculty";


export function updateFacultyFromState(newFaculty, dispatch, getState) {
    // Update without mutating
    const faculties = getState().faculty.faculties;
    dispatch(facultyListIsFetched(faculties.map(faculty => {
        if (faculty._id === newFaculty._id) {
            return newFaculty;
        }
        return faculty;
    })));
}

export const getFetchFacultyListThunk = () => dispatch => {
    dispatch(facultyListIsLoading());
    fetchAllFacultiesSummary()
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

export function getThirdPersonPronoun(faculty) {
    return faculty.sex === SEX.M.identifier ? "him" : "her";
}

export function formatMonthYearDate(date) {
    const dateString = `${date.month}-${date.year}`;
    return moment(dateString, "MM-YYYY").format("MMMM Y");
}
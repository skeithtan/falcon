import moment from "moment";
import { profilesFetched } from "../actions/faculty_profiles.actions";
import { SEX } from "../enums/faculty.enums";


export function updateFacultyFromState(newFaculty, dispatch, getState) {
    // Update without mutating
    const faculties = getState().facultyProfiles.faculties;
    dispatch(profilesFetched(faculties.map(faculty => {
        if (faculty._id === newFaculty._id) {
            return newFaculty;
        }
        return faculty;
    })));
}

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
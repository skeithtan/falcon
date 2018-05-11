import moment from "moment";
import { profilesFetched } from "../actions/faculty_profiles.actions";


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



export function formatMonthYearDate(date) {
    const dateString = `${date.month}-${date.year}`;
    return moment(dateString, "MM-YYYY").format("MMMM Y");
}
import { setFaculties } from "../actions/faculty_profiles.actions";

export function updateFacultyFromState(newFaculty, dispatch, getState) {
    // Update without mutating
    const faculties = getState().facultyProfiles.faculties;

    dispatch(setFaculties(faculties.map(faculty => {
        if (faculty._id === newFaculty._id) {
            return newFaculty;
        }

        return faculty;
    })));

}


export function getFullName(faculty) {
    const name = faculty.user.name;
    return `${name.first} ${name.last}`;
}
import { setFaculties } from "../actions/faculty_list.actions";

export function updateFacultyFromState(newFaculty, dispatch, getState) {
    // Update without mutating
    const faculties = getState().facultyList.faculties;

    dispatch(setFaculties(faculties.map(faculty => {
        if (faculty._id === newFaculty._id) {
            return newFaculty;
        }

        return faculty;
    })));

}

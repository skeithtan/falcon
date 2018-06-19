import { facultyIsUpdated } from "../redux/actions/faculty.actions";
import {
    subjectIsUpdated,
    subjectListFetchError,
    subjectListIsFetched,
    subjectListIsLoading,
} from "../redux/actions/subject.actions";
import { fetchAllSubjects } from "../services/subjects.service";


export const fetchSubjectList = dispatch => {
    dispatch(subjectListIsLoading());
    fetchAllSubjects()
        .then(result => {
            if (result.data) {
                dispatch(subjectListIsFetched(result.data.subjects));
            }
            if (result.errors) {
                dispatch(subjectListFetchError(result.errors));
            }
        })
        .catch(error => {
            dispatch(subjectListFetchError([error.message]));
        });
};

export const addSubjectToFaculties = ({dispatch, subject, faculties}) => faculties.forEach(faculty => {
    const currentTeachingSubjects = faculty.teachingSubjects ? faculty.teachingSubjects : [];
    dispatch(
        facultyIsUpdated({
            ...faculty,
            teachingSubjects: [
                ...currentTeachingSubjects,
                subject._id,
            ],
        }),
    );
});

export const addFacultyToSubjects = ({dispatch, faculty, subjects}) => subjects.forEach(subject =>
    dispatch(
        subjectIsUpdated({
            ...subject,
            faculties: [
                ...subject.faculties,
                faculty._id,
            ],
        }),
    ),
);

export const removeSubjectFromFaculties = ({dispatch, subject, faculties}) => faculties.forEach(faculty => {
    if (!faculty.teachingSubjects) {
        // If this hasn't been fetched yet, do nothing
        // The teachingSubjects bit will be updated when user goes to profile
        return;
    }

    dispatch(
        facultyIsUpdated({
            ...faculty,
            teachingSubjects: faculty.teachingSubjects.filter(subjectId =>
                subjectId !== subject._id,
            ),
        }),
    );
});

export const removeFacultyFromSubjects = ({dispatch, faculty, subjects}) => subjects.forEach(subject =>
    dispatch(
        subjectIsUpdated({
            ...subject,
            faculties: subject.faculties.filter(facultyId =>
                facultyId !== faculty._id,
            ),
        }),
    ),
);
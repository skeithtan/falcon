import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../redux/actions/faculty.actions";
import { unassignFacultyFromSubject } from "../../services/faculty/teaching_subjects";
import { removeFacultyFromSubjects } from "../../utils/subject.util";
import { UnassignSubjectModal as Component } from "./UnassignSubjectModal";


const mapDispatchToProps = dispatch => ({
    onConfirmRemove(faculty, subject) {
        return unassignFacultyFromSubject(faculty._id, subject._id)
            .then(() => {
                dispatch(facultyIsUpdated({
                    ...faculty,
                    teachingSubjects: faculty.teachingSubjects.filter(id => id !== subject._id),
                }));

                removeFacultyFromSubjects({
                    dispatch,
                    faculty,
                    subjects: [subject],
                });
            });
    },
});

export const UnassignSubjectModal = compose(
    connect(null, mapDispatchToProps),
)(Component);
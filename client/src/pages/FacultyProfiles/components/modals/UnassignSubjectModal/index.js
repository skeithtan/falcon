import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { unassignFacultyFromSubject } from "../../../../../services/faculty/teaching_subjects";
import { UnassignSubjectModal as Component } from "./UnassignSubjectModal";


const mapDispatchToProps = dispatch => ({
    onConfirmRemove(faculty, _id) {
        return unassignFacultyFromSubject(faculty._id, _id)
            .then(() => {
                dispatch(facultyIsUpdated({
                    ...faculty,
                    teachingSubjects: faculty.teachingSubjects.filter(subject => subject._id !== _id),
                }));
            });
    },
});

export const UnassignSubjectModal = compose(
    connect(null, mapDispatchToProps),
)(Component);
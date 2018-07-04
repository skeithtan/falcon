import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../redux/actions/toast.actions";
import { unassignFacultyFromSubject } from "../../services/faculty/teaching_subjects";
import { removeFacultyFromSubjects } from "../../utils/subject.util";


const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    onConfirmRemove(faculty, subject) {
        return unassignFacultyFromSubject(faculty._id, subject._id)
            .then(() => {

                if (faculty.teachingSubjects) {
                    dispatch(facultyIsUpdated({
                        ...faculty,
                        teachingSubjects: faculty.teachingSubjects.filter(id => id !== subject._id),
                    }));
                }

                removeFacultyFromSubjects({
                    dispatch,
                    faculty,
                    subjects: [subject],
                });
            });
    },
});

export const wrap = compose(
    connect(null, mapDispatchToProps),
);
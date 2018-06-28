import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { removePresentation } from "../../../../../services/faculty/presentation";


const mapDispatchToProps = dispatch => ({
    onConfirmRemove(faculty, _id) {
        return removePresentation(faculty._id, _id)
            .then(() => {
                const newFaculty = {
                    ...faculty,
                    presentations: faculty.presentations.filter(presentation => presentation._id !== _id),
                };

                dispatch(facultyIsUpdated(newFaculty));
            });
    },

    showToast(message) {
        dispatch(toastIsShowing(message));
    },
});

export const wrap = compose(
    connect(null, mapDispatchToProps),
);
import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { removeDegree } from "../../../../../services/faculty/degree";


const mapDispatchToProps = dispatch => ({
    onConfirmRemove(faculty, _id) {
        return removeDegree(faculty._id, _id)
            .then(() => {
                const newFaculty = {
                    ...faculty,
                    degrees: faculty.degrees.filter(degree => degree._id !== _id),
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
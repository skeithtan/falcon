import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { removeRecognition } from "../../../../../services/faculty/recognition";


const mapDispatchToProps = dispatch => ({
    onConfirmRemove(faculty, _id) {
        return removeRecognition(faculty._id, _id)
            .then(() => {
                const newFaculty = {
                    ...faculty,
                    recognitions: faculty.recognitions.filter(recognition => recognition._id !== _id),
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
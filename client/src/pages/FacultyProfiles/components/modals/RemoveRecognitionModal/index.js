import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { removeRecognition } from "../../../../../services/faculty/recognition";
import { RemoveRecognitionModal as Component } from "./RemoveRecognitionModal";


function mapDispatchToProps(dispatch) {
    return {
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
    };
}

export const RemoveRecognitionModal = compose(
    connect(null, mapDispatchToProps),
)(Component);
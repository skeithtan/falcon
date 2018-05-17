import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { removeRecognition } from "../../../../../services/faculty/recognition";
import RemoveRecognitionModal from "./RemoveRecognitionModal";


function mapDispatchToProps(dispatch) {
    return {
        onConfirmRemove(faculty, _id) {
            return removeRecognition(faculty._id, _id)
                .then(() => {
                    const newFaculty = {
                        ...faculty,
                        recognitions: faculty.recognitions.filter(recognition => recognition._id !== _id),
                    };

                    dispatch(profileIsUpdated(newFaculty));
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
)(RemoveRecognitionModal);
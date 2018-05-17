import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { removeDegree } from "../../../../../services/faculty/degree";
import RemoveDegreeModal from "./RemoveDegreeModal";


function mapDispatchToProps(dispatch) {
    return {
        onConfirmRemove(faculty, _id) {
            return removeDegree(faculty._id, _id)
                .then(() => {
                    const newFaculty = {
                        ...faculty,
                        degrees: faculty.degrees.filter(degree => degree._id !== _id),
                    };

                    dispatch(profileIsUpdated(newFaculty));
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
)(RemoveDegreeModal);
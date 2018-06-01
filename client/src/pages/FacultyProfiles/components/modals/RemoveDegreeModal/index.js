import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { removeDegree } from "../../../../../services/faculty/degree";
import { RemoveDegreeModal as Component } from "./RemoveDegreeModal";


function mapDispatchToProps(dispatch) {
    return {
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
    };
}

export const RemoveDegreeModal = compose(
    connect(null, mapDispatchToProps),
)(Component);
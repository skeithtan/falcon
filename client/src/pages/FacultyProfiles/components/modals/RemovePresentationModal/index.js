import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../actions/faculty.actions";
import { removePresentation } from "../../../../../services/faculty/presentation";
import RemovePresentationModal from "./RemovePresentationModal";


function mapDispatchToProps(dispatch) {
    return {
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
    };
}

export default compose(
    connect(null, mapDispatchToProps),
)(RemovePresentationModal);
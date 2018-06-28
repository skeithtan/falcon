import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { removeInstructionalMaterial } from "../../../../../services/faculty/instructional_material";


const mapDispatchToProps = dispatch => ({
    onConfirmRemove(faculty, _id) {
        return removeInstructionalMaterial(faculty._id, _id)
            .then(() => {
                const newFaculty = {
                    ...faculty,
                    instructionalMaterials: faculty.instructionalMaterials.filter(
                        instructionalMaterial => instructionalMaterial._id !== _id,
                    ),
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
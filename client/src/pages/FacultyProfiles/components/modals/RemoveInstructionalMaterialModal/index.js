import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../actions/faculty.actions";
import { removeInstructionalMaterial } from "../../../../../services/faculty/instructional_material";
import RemoveInstructionalMaterialModal from "./RemoveInstructionalMaterialModal";


function mapDispatchToProps(dispatch) {
    return {
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
    };
}

export default compose(
    connect(null, mapDispatchToProps),
)(RemoveInstructionalMaterialModal);
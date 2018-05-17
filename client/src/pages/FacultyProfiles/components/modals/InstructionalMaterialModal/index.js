import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { INSTRUCTIONAL_MATERIAL } from "../../../../../enums/faculty.enums";
import {
    addInstructionalMaterial,
    updateInstructionalMaterial,
} from "../../../../../services/faculty/instructional_material";
import styles from "../generic_modal_style";
import InstructionalMaterialModal from "./InstructionalMaterialModal";


function mapFormToInstructionalMaterialInput(form) {
    const instructionalMaterial = {...form};
    if (instructionalMaterial.audience === INSTRUCTIONAL_MATERIAL.AUDIENCE.TEACHER.identifier) {
        delete instructionalMaterial.level;
    }

    return instructionalMaterial;
}

function mapDispatchToProps(dispatch) {
    return {
        submitAddInstructionalMaterialForm(form, faculty) {
            const instructionalMaterial = mapFormToInstructionalMaterialInput(form);
            return addInstructionalMaterial(faculty._id, instructionalMaterial)
                .then(result => {
                    const newInstructionalMaterial = result.data.instructionalMaterial.create;
                    const newFaculty = {
                        ...faculty,
                        instructionalMaterials: [
                            ...faculty.instructionalMaterials,
                            newInstructionalMaterial,
                        ],
                    };

                    dispatch(profileIsUpdated(newFaculty));
                    return newInstructionalMaterial;
                });
        },

        submitUpdateInstructionalMaterialForm(form, instructionalMaterialId, faculty) {
            const instructionalMaterial = mapFormToInstructionalMaterialInput(form);
            return updateInstructionalMaterial(faculty._id, instructionalMaterialId, instructionalMaterial)
                .then(result => {
                    const newInstructionalMaterial = result.data.instructionalMaterial.update;
                    const newFaculty = {
                        ...faculty,
                        instructionalMaterials: faculty.instructionalMaterials.map(instructionalMaterial => {
                            if (instructionalMaterial._id === instructionalMaterialId) {
                                return newInstructionalMaterial;
                            }

                            return newInstructionalMaterial;
                        }),
                    };

                    dispatch(profileIsUpdated(newFaculty));
                    return newInstructionalMaterial;
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(InstructionalMaterialModal);

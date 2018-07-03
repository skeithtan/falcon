import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { INSTRUCTIONAL_MATERIAL } from "../../../../../enums/faculty.enums";
import { changeRequestIsAdded } from "../../../../../redux/actions/change_requests.actions";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import {
    addInstructionalMaterial,
    updateInstructionalMaterial,
} from "../../../../../services/faculty/instructional_material";
import { requestAddInstructionalMaterial } from "../../../../../services/faculty/request_profile_changes";


const mapFormToInstructionalMaterialInput = form => {
    const instructionalMaterial = {...form};
    if (instructionalMaterial.audience === INSTRUCTIONAL_MATERIAL.AUDIENCE.TEACHER.identifier) {
        delete instructionalMaterial.level;
    }

    return instructionalMaterial;
};

const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitAddInstructionalMaterialForm(form, faculty) {
        const instructionalMaterial = mapFormToInstructionalMaterialInput(form);
        return addInstructionalMaterial(faculty._id, instructionalMaterial)
            .then(result => {
                const newInstructionalMaterial = result.data.instructionalMaterial.add;
                const newFaculty = {
                    ...faculty,
                    instructionalMaterials: [
                        ...faculty.instructionalMaterials,
                        newInstructionalMaterial,
                    ],
                };

                dispatch(facultyIsUpdated(newFaculty));
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

                        return instructionalMaterial;
                    }),
                };

                dispatch(facultyIsUpdated(newFaculty));
                return newInstructionalMaterial;
            });
    },

    submitRequestAddInstructionalMaterialForm(form, faculty) {
        const instructionalMaterial = mapFormToInstructionalMaterialInput(form);
        return requestAddInstructionalMaterial(instructionalMaterial)
            .then(result => result.data.requestProfileChange.instructionalMaterial.add)
            .then(newInstructionalMaterial => {
                dispatch(changeRequestIsAdded(newInstructionalMaterial, faculty._id));
                return newInstructionalMaterial;
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
);

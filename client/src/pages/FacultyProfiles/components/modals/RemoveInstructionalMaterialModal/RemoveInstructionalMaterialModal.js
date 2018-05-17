import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import DangerActionConfirmationModal from "../../../../../components/DangerActionConfirmationModal";
import { getFullName } from "../../../../../utils/user";


export default class RemoveInstructionalMaterialModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return "Are you sure you want to remove this instructional material?";
    }

    get dialogContent() {
        const facultyName = getFullName(this.props.faculty.user);
        const {title, usageYear} = this.props.instructionalMaterial;
        return (
            <DialogContentText>
                You are about to remove <b>{facultyName}</b>'s instructional material
                titled <b>{title}</b> used in <b>{usageYear}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove instructional material";
    }

    onConfirmAction = () => {
        this.setState({isSubmitting: true, error: null});
        const {faculty, instructionalMaterial, onConfirmRemove} = this.props;

        onConfirmRemove(faculty, instructionalMaterial._id)
            .then(() => this.setState({isSubmitting: false}, this.closeModal))
            .catch(error => {
                console.log("An error occurred while removing instructional material", error);
                this.setState({isSubmitting: false, error: "An error occurred"});
            });
    };
}
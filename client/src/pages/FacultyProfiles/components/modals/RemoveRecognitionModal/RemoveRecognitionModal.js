import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { DangerActionConfirmationModal } from "../../../../../components/DangerActionConfirmationModal";
import { RECOGNITION } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";


export class RemoveRecognitionModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return "Are you sure you want to remove this recognition?";
    }

    get dialogContent() {
        const facultyName = getFullName(this.props.faculty.user);
        const {title, basis} = this.props.recognition;
        const basisName = RECOGNITION.BASIS[basis].name;

        return (
            <DialogContentText>
                You are about to remove <b>{facultyName}</b>'s <b>{basisName}</b> recognition titled <b>{title}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove recognition";
    }

    onConfirmAction = () => {
        this.setState({isSubmitting: true, error: null});
        const {faculty, recognition, onConfirmRemove} = this.props;

        onConfirmRemove(faculty, recognition._id)
            .then(() => this.setState({isSubmitting: false}, this.closeModal))
            .catch(error => {
                console.log("An error occurred while removing recognition", error);
                this.setState({isSubmitting: false, error: "An error occurred"});
            });
    };
}
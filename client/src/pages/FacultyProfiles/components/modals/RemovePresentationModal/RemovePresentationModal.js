import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import DangerActionConfirmationModal from "../../../../../components/DangerActionConfirmationModal";
import { getFullName } from "../../../../../utils/user";


export default class RemovePresentationModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return "Are you sure you want to remove this presentation?";
    }

    get dialogContent() {
        const facultyName = getFullName(this.props.faculty.user);
        const {title, date} = this.props.presentation;

        return (
            <DialogContentText>
                You are about to remove <b>{facultyName}</b>'s presentation
                titled <b>{title}</b> from <b>{date.year}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove presentation";
    }

    onConfirmAction = () => {
        this.setState({isSubmitting: true, error: null});
        const {faculty, presentation, onConfirmRemove} = this.props;

        onConfirmRemove(faculty, presentation._id)
            .then(() => this.setState({isSubmitting: false}, this.closeModal))
            .catch(error => {
                console.log("An error occurred while removing presentation", error);
                this.setState({isSubmitting: false, error: "An error occurred"});
            });
    };
}
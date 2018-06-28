import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { getFullName } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";


class BaseRemovePresentationModal extends ConfirmActionModal {
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

    get toastSuccessMessage() {
        return "Successfully removed presentation";
    }

    get submitAction() {
        const {faculty, presentation, onConfirmRemove} = this.props;
        return () => onConfirmRemove(faculty, presentation._id);
    }
}

export const RemovePresentationModal = wrap(BaseRemovePresentationModal);
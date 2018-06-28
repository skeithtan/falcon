import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { RECOGNITION } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";


class BaseRemoveRecognitionModal extends ConfirmActionModal {
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

    get submitAction() {
        const {faculty, recognition, onConfirmRemove} = this.props;
        return () => onConfirmRemove(faculty, recognition._id);
    }

    get toastSuccessMessage() {
        return "Recognition successfully removed";
    }
}

export const RemoveRecognitionModal = wrap(BaseRemoveRecognitionModal);
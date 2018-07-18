import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { wrap } from "./wrapper";
import { getFullName } from "../../../../../utils/user.util";
import { termScheduleToString } from "../../../../../utils/faculty_loading.util";
import { getPossessivePronoun } from "../../../../../utils/faculty.util";

class BaseRemoveFacultyModal extends ConfirmActionModal {
    get dialogTitle() {
        return "Are you sure you want to remove this faculty from this term?";
    }

    get dialogContent() {
        const { faculty, termSchedule } = this.props;
        const fullName = getFullName(faculty.user);
        const possesivePronoun = getPossessivePronoun(faculty);
        return (
            <DialogContentText>
                You are about to remove <strong>{fullName}</strong> from{" "}
                {termScheduleToString(termSchedule)}. Once removed, classes that
                are assigned to {possesivePronoun} will be unassigned.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove faculty";
    }

    get submitAction() {
        const { termSchedule, faculty, onConfirmRemove } = this.props;
        return () => onConfirmRemove(termSchedule, faculty);
    }

    get toastSuccessMessage() {
        return "Faculty successfully removed from term";
    }
}

export const RemoveFacultyModal = wrap(BaseRemoveFacultyModal);

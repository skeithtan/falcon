import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { getFullName } from "../../utils/user.util";
import { ConfirmActionModal } from "../ConfirmActionModal";
import { wrap } from "./wrapper";


class BaseUnassignSubjectModal extends ConfirmActionModal {
    get dialogTitle() {
        return this.props.perspective === "faculty" ?
            "Are you sure you want to unassign this subject?" :
            "Are you sure you want to unassign this faculty?";
    }

    get dialogContent() {
        const {subject, faculty} = this.props;
        const facultyName = getFullName(faculty.user);

        return (
            <DialogContentText>
                You are about to unassign <b>{facultyName}</b> from the subject <b>{subject.name}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return this.props.perspective === "faculty" ? "Unassign subject" : "Unassign faculty";
    }

    get toastSuccessMessage() {
        return this.props.perspective === "faculty" ?
            "Subject successfully unassigned" :
            "Faculty successfully unassigned";
    }

    get submitAction() {
        const {subject, faculty, onConfirmRemove} = this.props;
        return () => onConfirmRemove(faculty, subject);
    }
}

export const UnassignSubjectModal = wrap(BaseUnassignSubjectModal);
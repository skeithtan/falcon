import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import { wrap } from "./wrapper";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";

const MODAL_CONTENT_FOR_TERM_STATUS = {
    SCHEDULING: {
        dialogTitle:
            "Are you sure you want to return to add classes and faculty?",
        dialogContent: (
            <DialogContentText>
                You are about to return to{" "}
                <strong>add classes and faculty</strong>. You will be able to
                add classes and faculty and ask for availability, but you will
                not be able to assign faculty to classes. Assignments you have
                made while scheduling will not be affected.
            </DialogContentText>
        ),
    },
    FEEDBACK_GATHERING: {
        dialogTitle: "Are you sure you want to return to scheduling?",
        dialogContent: (
            <DialogContentText>
                You are about to <strong>return to scheduling</strong>. You will
                be able to modify and adjust assigned faculty again.
            </DialogContentText>
        ),
    },
    PUBLISHED: {
        dialogTitle: "Are you sure you want to return to feedback gathering?",
        dialogContent: (
            <DialogContentText>
                You are about to <strong>return to feedback gathering</strong>.
                If the term is on any other step that isn't published or
                feedback gathering, the faculty's schedules won't appear on
                their screens.
            </DialogContentText>
        ),
    },
};

class BaseReturnTermModal extends ConfirmActionModal {
    get modalContent() {
        const { termSchedule } = this.props;
        return MODAL_CONTENT_FOR_TERM_STATUS[termSchedule.status];
    }

    get dialogTitle() {
        return this.modalContent ? this.modalContent.dialogTitle : "";
    }

    get dialogContent() {
        return this.modalContent ? this.modalContent.dialogContent : "";
    }

    get buttonName() {
        return "Confirm";
    }

    get toastSuccessMessage() {
        return "Term schedule status has been set back";
    }

    get submitAction() {
        const { termSchedule, onConfirmReturn } = this.props;
        return () => onConfirmReturn(termSchedule);
    }
}

export const ReturnTermModal = wrap(BaseReturnTermModal);

import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import { wrap } from "./wrapper";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";

const MODAL_CONTENT_FOR_TERM_STATUS = {
    INITIALIZING: {
        dialogTitle: "Are you sure you want to move to start scheduling?",
        dialogContent: (
            <DialogContentText>
                You are about to move to <strong>scheduling</strong>. It is
                ideal to have collected every faculties' availability at this
                point. You will{" "}
                <strong>no longer be able to add faculties or classes</strong>{" "}
                in this stage, so ensure that all faculties and classes in this
                involved in this term has been added.
            </DialogContentText>
        ),
    },
    SCHEDULING: {
        dialogTitle: "Are you sure you want to move to feedback gathering?",
        dialogContent: (
            <DialogContentText>
                You are about to move to <strong>feedback gathering</strong>. At
                this point, all classes should have the right faculties.
            </DialogContentText>
        ),
    },
    FEEDBACK_GATHERING: {
        dialogTitle: "Are you sure you want to publish the schedule?",
        dialogContent: (
            <DialogContentText>
                You are about to <strong>publish the schedule</strong>. The
                schedule will appear in every faculty's page and marked as
                final.
            </DialogContentText>
        ),
    },
};

class BaseAdvanceTermModal extends ConfirmActionModal {
    get dialogTitle() {
        const { termSchedule } = this.props;
        return MODAL_CONTENT_FOR_TERM_STATUS[termSchedule.status].dialogTitle;
    }

    get dialogContent() {
        const { termSchedule } = this.props;
        return MODAL_CONTENT_FOR_TERM_STATUS[termSchedule.status].dialogContent;
    }

    get buttonName() {
        return "Confirm";
    }

    get toastSuccessMessage() {
        return "Term schedule status has been advanced";
    }

    get submitAction() {
        const { termSchedule, onConfirmAdvance } = this.props;
        return () => onConfirmAdvance(termSchedule);
    }
}

export const AdvanceTermModal = wrap(BaseAdvanceTermModal);

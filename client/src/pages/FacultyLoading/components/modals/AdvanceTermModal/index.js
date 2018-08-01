import React from "react";
import Card from "@material-ui/core/Card";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import { wrap } from "./wrapper";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { WarningList } from "./WarningList";
import {
    getPendingWarnings,
    getRejectionWarnings,
    getNoFeedbackWarnings,
    getUnassignedWarnings,
} from "../../../../../utils/faculty_loading_warnings.util";

const MODAL_CONTENT_FOR_TERM_STATUS = {
    INITIALIZING: {
        dialogTitle: "Are you sure you want to move to start scheduling?",
        renderDialogContent: (
            <DialogContentText>
                You are about to move to <strong>scheduling</strong>. It is
                ideal to have collected everyone's availability at this point.
                You will{" "}
                <strong>
                    no longer be able to add faculty members or classes
                </strong>{" "}
                in this stage, so ensure that all faculty members and classes in
                this involved in this term has been added.
            </DialogContentText>
        ),
        getWarnings: termSchedule => [...getPendingWarnings(termSchedule)],
    },
    SCHEDULING: {
        dialogTitle: "Are you sure you want to move to feedback gathering?",
        renderDialogContent: (
            <DialogContentText>
                You are about to move to <strong>feedback gathering</strong>. At
                this point, all classes should have the appropriate faculty.
            </DialogContentText>
        ),
        getWarnings: termSchedule => [...getUnassignedWarnings(termSchedule)],
    },
    FEEDBACK_GATHERING: {
        dialogTitle: "Are you sure you want to publish the schedule?",
        renderDialogContent: (
            <DialogContentText>
                You are about to <strong>publish the schedule</strong>. The
                schedule will appear in every faculty member's page and marked
                as final.
            </DialogContentText>
        ),
        getWarnings: termSchedule => [
            ...getRejectionWarnings(termSchedule),
            ...getNoFeedbackWarnings(termSchedule),
            ...getUnassignedWarnings(termSchedule),
        ],
    },
};

class BaseAdvanceTermModal extends ConfirmActionModal {
    get modalContent() {
        const { termSchedule } = this.props;
        return MODAL_CONTENT_FOR_TERM_STATUS[termSchedule.status];
    }

    get dialogTitle() {
        return (this.modalContent && this.modalContent.dialogTitle) || "";
    }

    renderSevereWarningText = () => (
        <DialogContentText>
            You cannot proceed to next step without resolving the red warnings.
        </DialogContentText>
    );

    get dialogContent() {
        const { termSchedule } = this.props;
        const warnings =
            this.modalContent && this.modalContent.getWarnings(termSchedule);

        const hasSevere =
            warnings.filter(warning => warning.isSevere).length > 0;

        return (
            <Grid container spacing={16} direction="column" wrap="nowrap">
                {warnings && (
                    <Grid item>
                        <Card>
                            <WarningList warnings={warnings} />
                        </Card>
                    </Grid>
                )}
                {this.modalContent && (
                    <Grid item>{this.modalContent.renderDialogContent}</Grid>
                )}

                {hasSevere && (
                    <Grid item>{this.renderSevereWarningText()}</Grid>
                )}
            </Grid>
        );
    }

    get buttonName() {
        return "Confirm";
    }

    get toastSuccessMessage() {
        return "Term schedule status has been advanced";
    }

    get submitButtonIsEnabled() {
        const { termSchedule } = this.props;

        // Only if warnings are not severe
        return this.modalContent
            .getWarnings(termSchedule)
            .every(warning => !warning.isSevere);
    }

    get submitAction() {
        const { termSchedule, onConfirmAdvance } = this.props;
        return () => onConfirmAdvance(termSchedule);
    }
}

export const AdvanceTermModal = wrap(BaseAdvanceTermModal);

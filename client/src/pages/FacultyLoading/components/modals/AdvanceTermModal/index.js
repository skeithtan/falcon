import React from "react";
import Card from "@material-ui/core/Card";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import { wrap } from "./wrapper";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { FACULTY_FEEDBACK } from "../../../../../enums/class.enums";
import { WarningList } from "./WarningList";

const MODAL_CONTENT_FOR_TERM_STATUS = {
    INITIALIZING: {
        dialogTitle: "Are you sure you want to move to start scheduling?",
        renderDialogContent: (
            <DialogContentText>
                You are about to move to <strong>scheduling</strong>. It is
                ideal to have collected every faculties' availability at this
                point. You will{" "}
                <strong>no longer be able to add faculties or classes</strong>{" "}
                in this stage, so ensure that all faculties and classes in this
                involved in this term has been added.
            </DialogContentText>
        ),
        getWarnings: termSchedule => {
            let warnings = [];
            const pendingAvailabilityCount = termSchedule.facultyPool.filter(
                response => response.availability === null
            ).length;

            if (pendingAvailabilityCount > 0) {
                warnings.push(
                    `${pendingAvailabilityCount} faculties have not yet submited their availability.`
                );
            }

            return warnings;
        },
    },
    SCHEDULING: {
        dialogTitle: "Are you sure you want to move to feedback gathering?",
        renderDialogContent: (
            <DialogContentText>
                You are about to move to <strong>feedback gathering</strong>. At
                this point, all classes should have the right faculties.
            </DialogContentText>
        ),
        getWarnings: termSchedule => {
            let warnings = [];
            // TODO: Computation
            return warnings;
        },
    },
    FEEDBACK_GATHERING: {
        dialogTitle: "Are you sure you want to publish the schedule?",
        renderDialogContent: (
            <DialogContentText>
                You are about to <strong>publish the schedule</strong>. The
                schedule will appear in every faculty's page and marked as
                final.
            </DialogContentText>
        ),
        getWarnings: termSchedule => {
            let warnings = [];

            const noFeedbackCount = termSchedule.facultyPool.filter(
                response => response.feedback === null
            ).length;

            const rejectionCount = termSchedule.facultyPool.filter(
                response =>
                    response.feedback &&
                    response.feedback.status ===
                        FACULTY_FEEDBACK.REJECTED.identifier
            ).length;

            if (noFeedbackCount > 0) {
                warnings.push(
                    `${noFeedbackCount} faculties have not yet given their feedback`
                );
            }

            if (rejectionCount > 0) {
                warnings.push(
                    `${rejectionCount} has rejected the proposed schedule`
                );
            }

            return warnings;
        },
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

    renderWarnings = warnings => {};

    get dialogContent() {
        const { termSchedule } = this.props;
        const warnings =
            this.modalContent && this.modalContent.getWarnings(termSchedule);

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
            </Grid>
        );
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

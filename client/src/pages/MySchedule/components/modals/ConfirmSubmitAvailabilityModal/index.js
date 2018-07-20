import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import { wrap } from "./wrapper";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";

class BaseConfirmSubmitAvailabilityModal extends ConfirmActionModal {
    get dialogTitle() {
        return "Are you sure you want to submit to submit your time availability?";
    }

    get dialogContent() {
        return (
            <DialogContentText>
                Your time availability will serve as the reference for your
                class assignments next term.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Confirm submit";
    }

    get submitAction() {
        const { availability, termSchedule, onConfirmSubmitAvailability } = this.props;
        return () => onConfirmSubmitAvailability(availability, termSchedule);
    }

    get toastSuccessMessage() {
        return "Time availability successfully updated";
    }
}

export const ConfirmSubmitAvailabilityModal = wrap(
    BaseConfirmSubmitAvailabilityModal
);

import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { MEETING_DAYS, MEETING_HOURS } from "../../../../../enums/class.enums";
import { wrap } from "./wrapper";

class BaseRemoveClassScheduleModal extends ConfirmActionModal {
    get dialogTitle() {
        return "Are you sure you want to remove this class?";
    }

    get dialogContent() {
        const { subject, classSchedule } = this.props;
        const meetingDays = MEETING_DAYS[classSchedule.meetingDays].name;
        const meetingHours = MEETING_HOURS[classSchedule.meetingHours].name;

        return (
            <DialogContentText>
                You are about to remove class <strong>{subject.name}</strong>{" "}
                every <strong>{meetingDays}</strong> at{" "}
                <strong>{meetingHours}</strong> at{" "}
                <strong>{classSchedule.room}</strong>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove class";
    }

    get submitAction() {
        const {onRemoveClassSchedule, termSchedule, classSchedule} = this.props;
        return () => onRemoveClassSchedule(termSchedule, classSchedule);
    }

    get toastSuccessMessage() {
        return "Class successfully removed";
    }
}

export const RemoveClassScheduleModal = wrap(BaseRemoveClassScheduleModal);

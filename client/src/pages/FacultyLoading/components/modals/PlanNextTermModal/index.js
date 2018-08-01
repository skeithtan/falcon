import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { wrap } from "./wrapper";
import { makeURL } from "../../../../../utils/url.util";
import {
    termScheduleToString,
    termToPlan,
} from "../../../../../utils/faculty_loading.util";

class BasePlanNextTermModal extends ConfirmActionModal {
    get dialogTitle() {
        return `Plan ${termScheduleToString(termToPlan)}`;
    }

    get dialogContent() {
        return (
            <DialogContentText>
                You are about to begin planning{" "}
                <strong>{termScheduleToString(termToPlan)}</strong>. Once you
                have begun planning this term, all other terms will be{" "}
                <strong>archived and unmodifiable</strong>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Begin planning";
    }

    get submitAction() {
        const { onConfirmPlanNextTerm, history } = this.props;
        return () =>
            onConfirmPlanNextTerm(termToPlan).then(newTermSchedule =>
                history.push(
                    makeURL()
                        .facultyLoading()
                        .selectTermSchedule(newTermSchedule._id)
                        .build()
                )
            );
    }

    get toastSuccessMessage() {
        return `${this.plannedTermText} has been successfully initiated`;
    }
}

export const PlanNextTermModal = wrap(BasePlanNextTermModal);

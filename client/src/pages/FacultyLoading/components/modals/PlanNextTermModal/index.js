import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { ConfirmActionModal } from "../../../../../components/ConfirmActionModal";
import { formatAcademicYear } from "../../../../../utils/faculty_loading.util";
import { wrap } from "./wrapper";
import { makeURL } from "../../../../../utils/url.util";

class BasePlanNextTermModal extends ConfirmActionModal {
    get dialogTitle() {
        return `Plan ${this.plannedTermText}`;
    }

    get plannedTermText() {
        const { term, startYear } = this.props;
        return `${term.name} term ${formatAcademicYear(startYear)}`;
    }

    get dialogContent() {
        return (
            <DialogContentText>
                You are about to begin planning{" "}
                <strong>{this.plannedTermText}</strong>. Once you have begun
                planning this term, all other terms will be{" "}
                <strong>archived and unmodifiable</strong>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Begin planning";
    }

    get submitAction() {
        const { onConfirmPlanNextTerm, startYear, term, history } = this.props;
        return () =>
            onConfirmPlanNextTerm(startYear, term).then(newTermSchedule =>
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

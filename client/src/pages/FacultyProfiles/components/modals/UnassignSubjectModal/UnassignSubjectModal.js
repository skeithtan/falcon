import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { DangerActionConfirmationModal } from "../../../../../components/DangerActionConfirmationModal";
import { unassignFacultyFromSubject } from "../../../../../services/faculty/teaching_subjects";
import { getFullName } from "../../../../../utils/user.util";


export class UnassignSubjectModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return "Are you sure you want to unassign this subject?";
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
        return "Unassign subject";
    }

    onConfirmAction = () => {
        this.setState({isSubmitting: true, error: null});
        const {subject, faculty, onSubjectRemoved} = this.props;

        unassignFacultyFromSubject(faculty._id, subject._id)
            .then(() => this.setState({isSubmitting: false}, () => {
                onSubjectRemoved();
                this.closeModal();
            }))
            .catch(error => {
                console.log("An error occurred unassigning subject from faculty", error);
                this.setState({isSubmitting: false, error: "An error occurred"});
            });
    };
}
import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import DangerActionConfirmationModal from "../../../../../components/DangerActionConfirmationModal";
import { getFullName } from "../../../../../utils/user";


export default class RemoveDegreeModal extends DangerActionConfirmationModal {
    get dialogContent() {
        const facultyName = getFullName(this.props.faculty.user);
        const {title, completionYear} = this.props.degree;

        return (
            <DialogContentText>
                You are about to remove <b>{facultyName}</b>'s degree <b>{title}</b> from <b>{completionYear}</b>.
            </DialogContentText>
        );
    }

    onConfirmAction = () => {
        this.setState({isSubmitting: true, error: null});
        const {faculty, degree, onConfirmRemove} = this.props;

        onConfirmRemove(faculty, degree._id)
            .then(() => this.setState({isSubmitting: false}, this.closeModal))
            .catch(error => {
                console.log(error);
                this.setState({isSubmitting: false, error: error});
            });
    };
}

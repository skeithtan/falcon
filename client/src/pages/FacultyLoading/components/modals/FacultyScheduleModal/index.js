import React, { PureComponent } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { getFullName } from "../../../../../utils/user.util";
import { FacultyScheduleCards } from "../../../../../components/FacultyScheduleCards";

export class FacultyScheduleModal extends PureComponent {
    render() {
        const { open, onClose, faculty, assignedClasses } = this.props;
        const fullName = getFullName(faculty.user);
        return (
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>{fullName}'s Schedule</DialogTitle>
                <DialogContent>
                    <FacultyScheduleCards assignedClasses={assignedClasses} />
                </DialogContent>
            </Dialog>
        );
    }
}

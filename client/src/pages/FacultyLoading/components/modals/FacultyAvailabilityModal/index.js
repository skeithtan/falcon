import React, { PureComponent } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { getFullName } from "../../../../../utils/user.util";
import { TimeAvailabilityCards } from "../../../../../components/TimeAvailabilityCards";

export class FacultyAvailabilityModal extends PureComponent {
    render() {
        const { open, onClose, faculty, availability } = this.props;
        const fullName = getFullName(faculty.user);

        return (
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>{fullName}'s Availability</DialogTitle>
                <DialogContent>
                    <TimeAvailabilityCards availability={availability} />
                </DialogContent>
            </Dialog>
        );
    }
}

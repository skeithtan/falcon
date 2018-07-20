import React, { PureComponent } from "react";
import { StatusChip } from "../../../StatusChip";


export class InitializingInfo extends PureComponent {
    render() {
        const { facultyResponse } = this.props;
        const pendingAvailability = facultyResponse.availability === null;
        return pendingAvailability ? (
            <StatusChip color="yellow" label="Pending availability" />
        ) : (
            <StatusChip color="green" label="Availability submitted" />
        );
    }
}
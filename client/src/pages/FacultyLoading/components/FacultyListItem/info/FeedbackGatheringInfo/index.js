import React, { PureComponent } from "react";
import { StatusChip } from "../../../StatusChip";
import { FACULTY_FEEDBACK } from "../../../../../../enums/class.enums";

export class FeedbackGatheringInfo extends PureComponent {
    render() {
        const { feedback } = this.props;
        if (feedback === null) {
            return <StatusChip color="yellow" label="Pending feedback" />;
        }

        const { status } = feedback;

        if (status === FACULTY_FEEDBACK.REJECTED.identifier) {
            return (
                <StatusChip feedback={feedback} color="red" label="Rejected" />
            );
        }

        return (
            <StatusChip feedback={feedback} color="green" label="Accepted" />
        );
    }
}

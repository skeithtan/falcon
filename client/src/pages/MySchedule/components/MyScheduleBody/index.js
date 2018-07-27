import React from "react";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { InitializingState } from "../InitializingState";
import { UninvolvedState } from "../UninvolvedState";
import { SchedulingState } from "../SchedulingState";
import { FeedbackState } from "../FeedbackState";
import { PublishedState } from "../PublishedState";

export const MyScheduleBody = props => {
    const { termSchedule } = props;

    if (!termSchedule.involved) {
        return <UninvolvedState termSchedule={termSchedule} />;
    }

    const { INITIALIZING, SCHEDULING, FEEDBACK_GATHERING } = TERM_STATUSES;

    switch (termSchedule.status) {
        case INITIALIZING.identifier:
            return <InitializingState {...props} />;
        case SCHEDULING.identifier:
            return <SchedulingState {...props} />;
        case FEEDBACK_GATHERING.identifier:
            return <FeedbackState {...props} />;
        default:
            return <PublishedState {...props} />;
    }
};

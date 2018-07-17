import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { InitializingState } from "../InitializingState";

class PublishedState extends Component {
    render() {
        return null; // TODO
    }
}

class FeedbackState extends Component {
    render() {
        return null; // TODO
    }
}

class SchedulingState extends Component {
    render() {
        return null; // TODO
    }
}

export const MyScheduleBody = props => {
    const { termSchedule } = props;
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

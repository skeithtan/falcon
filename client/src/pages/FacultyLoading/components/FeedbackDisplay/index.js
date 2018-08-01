import React, { PureComponent } from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AcceptedIcon from "@material-ui/icons/ThumbUp";
import RejectionIcon from "@material-ui/icons/ThumbDown";
import moment from "moment";
import { getFullName } from "../../../../utils/user.util";
import { wrap } from "./wrapper";
import { FACULTY_FEEDBACK } from "../../../../enums/class.enums";
import {
    getPersonalPronoun,
    getPossessivePronoun,
} from "../../../../utils/faculty.util";

class BaseFeedbackDisplay extends PureComponent {
    get submissionString() {
        const {
            feedback: { submitted },
        } = this.props;
        return moment(submitted).fromNow();
    }

    renderRejectionMessage = () => {
        const { classes, feedback, faculty } = this.props;
        const fullName = getFullName(faculty.user);
        const pronoun = getPersonalPronoun(faculty);

        return (
            <CardContent>
                <Grid container spacing={16} direction="column" wrap="nowrap">
                    <Grid item>
                        <RejectionIcon className={classes.rejectedColor} />
                    </Grid>
                    <Grid item>
                        <Typography color="textSecondary">
                            {getFullName(faculty.user)}{" "}
                            <strong>rejected</strong> the proposed schedule{" "}
                            {this.submissionString} because of the following
                            reason:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{feedback.rejectionReason}</Typography>
                    </Grid>
                    {feedback.isDirty && (
                        <Grid item>
                            <Typography color="textSecondary">
                                {fullName}'s schedule{" "}
                                <strong>has been modified</strong>. Because this
                                schedule is no longer what {fullName} rejected,{" "}
                                {pronoun} <strong>will be asked again</strong>{" "}
                                for their feedback on Feedback gathering stage.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        );
    };

    renderAcceptanceMessage = () => {
        const { classes, faculty, feedback } = this.props;
        const fullName = getFullName(faculty.user);
        const personalPronoun = getPersonalPronoun(faculty);
        const possessivePronoun = getPossessivePronoun(faculty);
        return (
            <CardContent>
                <Grid container spacing={16} direction="column" wrap="nowrap">
                    <Grid item>
                        <AcceptedIcon className={classes.acceptedColor} />
                    </Grid>
                    <Grid item>
                        <Typography color="textSecondary">
                            {fullName} <strong>accepted</strong> the proposed
                            schedule {this.submissionString}.
                        </Typography>
                    </Grid>
                    {feedback.isDirty && (
                        <Grid item>
                            <Typography color="textSecondary">
                                {fullName}'s schedule{" "}
                                <strong>has been modified</strong>. Because this
                                schedule is no longer what {fullName} agreed to,{" "}
                                {personalPronoun}{" "}
                                <strong>will be asked again</strong> for{" "}
                                {possessivePronoun} feedback on feedback
                                gathering stage.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        );
    };

    render() {
        const {
            feedback: { status },
        } = this.props;

        return status === FACULTY_FEEDBACK.ACCEPTED.identifier
            ? this.renderAcceptanceMessage()
            : this.renderRejectionMessage();
    }
}

export const FeedbackDisplay = wrap(BaseFeedbackDisplay);

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { wrap } from "./wrapper";
import { FacultyScheduleCards } from "../../../../components/FacultyScheduleCards";

class BaseFeedbackState extends Component {
    state = {
        submitFeedbackModalIsShowing: false,
    };

    renderMessage = () => {
        const { termSchedule, classes } = this.props;

        return (
            <Card className={classes.messageContainer}>
                <Grid container direction="column" spacing={16} wrap="nowrap">
                    <Grid item>
                        <Typography variant="subheading">
                            Your schedule for{" "}
                            <strong>
                                {" "}
                                {termScheduleToString(termSchedule)}{" "}
                            </strong>{" "}
                            has been prepared.
                        </Typography>
                    </Grid>
                    <Grid item>{this.renderActions()}</Grid>
                </Grid>
            </Card>
        );
    };

    renderActions = () => {
        const { termSchedule } = this.props;
        const { submitFeedbackModalIsShowing } = this.state;
        const pendingFeedback = termSchedule.feedback === null;

        const message = pendingFeedback
            ? "You have not yet sent your feedback"
            : "Your feedback has been received";

        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
            >
                <Grid item>
                    <Typography>{message}</Typography>
                </Grid>

                {pendingFeedback && (
                    <Grid item>
                        <Grid
                            container
                            spacing={16}
                            direction="row"
                            alignItems="center"
                            wrap="nowrap"
                        >
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleConfirmSubmitAvailabilityModal(
                                            true
                                        )
                                    }
                                >
                                    I want something changed
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleConfirmSubmitAvailabilityModal(
                                            true
                                        )
                                    }
                                >
                                    Accept schedule
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        );
    };

    render() {
        const { termSchedule } = this.props;
        return (
            <Grid
                spacing={16}
                container
                direction="column"
                justify="center"
                wrap="nowrap"
            >
                <Grid item>{this.renderMessage()}</Grid>

                <Grid item>
                    <FacultyScheduleCards assignedClasses={termSchedule.classes} />
                </Grid>
            </Grid>
        );
    }
}

export const FeedbackState = wrap(BaseFeedbackState);

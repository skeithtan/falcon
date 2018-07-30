import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { wrap } from "./wrapper";
import { FacultyScheduleCards } from "../../../../components/FacultyScheduleCards";
import { FACULTY_FEEDBACK } from "../../../../enums/class.enums";
import { FeedbackModal } from "../modals/FeedbackModal";
import { TermsModal } from "../../../FacultyLoading/components/modals/TermsModal";

class BaseFeedbackState extends Component {
    state = {
        termsModalIsShowing: false,
        submitFeedbackModalIsShowing: false,
        feedbackStatus: FACULTY_FEEDBACK.ACCEPTED.identifier,
    };

    toggleTermsModal = shouldShow =>
        this.setState({
            termsModalIsShowing: shouldShow,
        });

    toggleSubmitFeedbackModal = (
        shouldShow,
        feedbackStatus = this.state.feedbackStatus
    ) =>
        this.setState({
            submitFeedbackModalIsShowing: shouldShow,
            feedbackStatus: feedbackStatus,
        });

    renderMessage = () => {
        const { termSchedule, classes } = this.props;

        return (
            <Card className={classes.messageContainer}>
                <Grid container direction="column" spacing={16} wrap="nowrap">
                    <Grid item>
                        <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => this.toggleTermsModal(true)}
                        >
                            View other terms
                        </Button>
                    </Grid>
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
        const { submitFeedbackModalIsShowing, feedbackStatus } = this.state;
        const pendingFeedback = termSchedule.feedback === null;

        const { ACCEPTED, REJECTED } = FACULTY_FEEDBACK;

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
                                        this.toggleSubmitFeedbackModal(
                                            true,
                                            REJECTED.identifier
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
                                        this.toggleSubmitFeedbackModal(
                                            true,
                                            ACCEPTED.identifier
                                        )
                                    }
                                >
                                    Accept schedule
                                </Button>
                            </Grid>
                        </Grid>

                        <FeedbackModal
                            action="update"
                            open={submitFeedbackModalIsShowing}
                            onClose={() =>
                                this.toggleSubmitFeedbackModal(false)
                            }
                            status={feedbackStatus}
                            termSchedule={termSchedule}
                            availability={termSchedule.availability}
                        />
                    </Grid>
                )}
            </Grid>
        );
    };

    render() {
        const { termsModalIsShowing } = this.state;
        const { classes, termSchedule } = this.props;
        return (
            <div className={classes.cardsContainer}>
                <Grid
                    spacing={16}
                    container
                    direction="column"
                    justify="center"
                    wrap="nowrap"
                >
                    <Grid item>{this.renderMessage()}</Grid>

                    <Grid item>
                        <FacultyScheduleCards
                            assignedClasses={termSchedule.classes}
                        />
                    </Grid>
                </Grid>

                <TermsModal
                    open={termsModalIsShowing}
                    onClose={() => this.toggleTermsModal(false)}
                    activeTermSchedule={termSchedule}
                />
            </div>
        );
    }
}

export const FeedbackState = wrap(BaseFeedbackState);

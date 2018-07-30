import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { wrap } from "./wrapper";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { ConfirmSubmitAvailabilityModal } from "../modals/ConfirmSubmitAvailabilityModal";
import { TimeAvailabilityCards } from "../../../../components/TimeAvailabilityCards";
import { TermsModal } from "../../../FacultyLoading/components/modals/TermsModal";

class BaseInitializingState extends Component {
    state = {
        confirmSubmitAvailabilityModalIsShowing: false,
        termsModalIsShowing: false,
        form: {
            M_TH: [],
            T_F: [],
        },
    };

    componentDidMount() {
        const {
            termSchedule: { availability },
        } = this.props;

        if (availability) {
            this.setState({
                form: {
                    M_TH: [...availability.M_TH],
                    T_F: [...availability.T_F],
                },
            });
        }
    }

    toggleTermsModal = shouldShow =>
        this.setState({
            termsModalIsShowing: shouldShow,
        });

    toggleConfirmSubmitAvailabilityModal = shouldShow =>
        this.setState({
            confirmSubmitAvailabilityModalIsShowing: shouldShow,
        });

    toggleAvailability(meetingDay, meetingHour) {
        const newState = { ...this.state };

        let meetingHours = newState.form[meetingDay];
        if (!meetingHours.includes(meetingHour)) {
            meetingHours.push(meetingHour);
        } else {
            newState.form[meetingDay] = meetingHours.filter(
                hour => hour !== meetingHour
            );
        }

        this.setState(newState);
    }

    renderMessage = () => {
        const { termSchedule, classes } = this.props;

        return (
            <Card className={classes.messageContainer}>
                <Grid container direction="column" spacing={16} wrap="nowrap">
                    <Grid
                        item
                        container
                        direction="column"
                        spacing={16}
                        wrap="nowrap"
                    >
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
                                Planning for{" "}
                                <strong>
                                    {termScheduleToString(termSchedule)}
                                </strong>{" "}
                                has begun and we're collecting everyone's time
                                availability. While collection is still going
                                on, you can still update your time preferences.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>{this.renderActions()}</Grid>
                </Grid>
            </Card>
        );
    };

    renderActions = () => {
        const { termSchedule } = this.props;
        const { confirmSubmitAvailabilityModalIsShowing, form } = this.state;
        const pendingAvailability = termSchedule.availability === null;

        const message = pendingAvailability
            ? "You have not yet set your time availability for this term."
            : "You have already submitted your time availability.";

        const buttonName = pendingAvailability
            ? "Submit time availability"
            : "Update time availability";

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

                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                            this.toggleConfirmSubmitAvailabilityModal(true)
                        }
                    >
                        {buttonName}
                    </Button>
                </Grid>

                <ConfirmSubmitAvailabilityModal
                    open={confirmSubmitAvailabilityModalIsShowing}
                    onClose={() =>
                        this.toggleConfirmSubmitAvailabilityModal(false)
                    }
                    availability={form}
                    termSchedule={termSchedule}
                />
            </Grid>
        );
    };

    render() {
        const { form, termsModalIsShowing } = this.state;
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
                        <TimeAvailabilityCards
                            availability={form}
                            onChange={(day, hour) =>
                                this.toggleAvailability(day, hour)
                            }
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

export const InitializingState = wrap(BaseInitializingState);

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Toolbar from "@material-ui/core/Toolbar";
import React, { Component } from "react";
import { termScheduleToString } from "../../../../../utils/faculty_loading.util";
import { TERM_STATUSES } from "../../../../../enums/class.enums";
import { wrap } from "./wrapper";
import { AdvanceTermModal } from "../../modals/AdvanceTermModal";

const steps = Object.values(TERM_STATUSES)
    // Remove archived
    .filter(
        ({ identifier }) => identifier !== TERM_STATUSES.ARCHIVED.identifier
    );

const getAdvanceButtonMessage = activeTermStatus => {
    switch (activeTermStatus) {
        case TERM_STATUSES.INITIALIZING.identifier:
            return "Proceed to scheduling";
        case TERM_STATUSES.SCHEDULING.identifier:
            return "Get faculty feedback";
        case TERM_STATUSES.FEEDBACK_GATHERING.identifier:
            return "Publish schedule";
        default:
            return null;
    }
};

class BaseOverviewCard extends Component {
    state = {
        advanceTermModalIsShowing: false,
        returnTermModalIsShowing: false,
    };

    toggleAdvanceTermModal = shouldShow =>
        this.setState({
            advanceTermModalIsShowing: shouldShow,
        });

    toggleReturnTermModal = shouldShow =>
        this.setState({
            returnTermModalIsShowing: shouldShow,
        });

    renderButtons = () => {
        const { activeTermSchedule } = this.props;
        const {
            advanceTermModalIsShowing,
            returnTermModalIsShowing,
        } = this.state;

        const canReturnToPreviousState = ![
            TERM_STATUSES.INITIALIZING.identifier,
            TERM_STATUSES.PUBLISHED.identifier,
            TERM_STATUSES.ARCHIVED.identifier,
        ].includes(activeTermSchedule.status);

        const canAdvanceTermSchedule = ![
            TERM_STATUSES.PUBLISHED.identifier,
            TERM_STATUSES.ARCHIVED.identifier,
        ].includes(activeTermSchedule.status);

        return (
            <Grid container spacing={16} direction="row" alignItems="center">
                {canReturnToPreviousState && (
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => this.toggleReturnTermModal(true)}
                        >
                            Return to previous stage
                        </Button>
                    </Grid>
                )}

                <Grid item>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={() => this.toggleAdvanceTermModal(true)}
                    >
                        {getAdvanceButtonMessage(activeTermSchedule.status)}
                    </Button>
                </Grid>

                {canAdvanceTermSchedule && (
                    <AdvanceTermModal
                        open={advanceTermModalIsShowing}
                        onClose={() => this.toggleAdvanceTermModal(false)}
                        termSchedule={activeTermSchedule}
                    />
                )}
            </Grid>
        );
    };

    render() {
        const { activeTermSchedule, user } = this.props;
        const canMutateTermSchedule = user.permissions.MUTATE_TERM_SCHEDULES;
        const activeStepIndex = steps.findIndex(
            step => step.identifier === activeTermSchedule.status
        );

        const isArchived =
            activeTermSchedule.status === TERM_STATUSES.ARCHIVED.identifier;

        return (
            <Card>
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="title">
                                {termScheduleToString(activeTermSchedule)}
                            </Typography>
                        </Grid>

                        {isArchived && (
                            <Grid item>
                                <Typography
                                    variant="subheading"
                                    color="textSecondary"
                                >
                                    This term has been archived and is only
                                    available for viewing
                                </Typography>
                            </Grid>
                        )}

                        {canMutateTermSchedule && (
                            <Grid item>{this.renderButtons()}</Grid>
                        )}
                    </Grid>
                </Toolbar>
                {!isArchived && (
                    <Stepper activeStep={activeStepIndex}>
                        {steps.map(({ identifier, name }) => (
                            <Step key={identifier}>
                                <StepLabel>{name}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )}
            </Card>
        );
    }
}

export const OverviewCard = wrap(BaseOverviewCard);

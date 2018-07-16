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

class BaseOverviewCard extends Component {
    state = {
        advanceTermModalIsShowing: false,
    };

    toggleAdvanceTermModal = shouldShow =>
        this.setState({
            advanceTermModalIsShowing: shouldShow,
        });

    render() {
        const { activeTermSchedule, user } = this.props;
        const { advanceTermModalIsShowing } = this.state;

        const activeStepIndex = steps.findIndex(
            step => step.identifier === activeTermSchedule.status
        );

        const canMutateTermSchedule = user.permissions.MUTATE_TERM_SCHEDULES;
        const canAdvanceTermSchedule =
            canMutateTermSchedule &&
            activeTermSchedule.status !== TERM_STATUSES.PUBLISHED.identifier &&
            activeTermSchedule.status !== TERM_STATUSES.ARCHIVED.identifier;

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
                                <Typography variant="subheading" color="textSecondary">
                                    This term has been archived{" "}
                                    and is only available for viewing
                                </Typography>
                            </Grid>
                        )}

                        {canAdvanceTermSchedule && (
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        this.toggleAdvanceTermModal(true)
                                    }
                                >
                                    Proceed to get faculty availability
                                </Button>
                            </Grid>
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

                {canAdvanceTermSchedule && (
                    <AdvanceTermModal
                        open={advanceTermModalIsShowing}
                        onClose={() => this.toggleAdvanceTermModal(false)}
                        termSchedule={activeTermSchedule}
                    />
                )}
            </Card>
        );
    }
}

export const OverviewCard = wrap(BaseOverviewCard);

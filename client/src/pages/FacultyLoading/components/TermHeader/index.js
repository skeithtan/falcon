import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ArrowDownIcon from "@material-ui/icons/ArrowDropDown";
import Toolbar from "@material-ui/core/Toolbar";
import PrintIcon from "@material-ui/icons/Print";
import React, { Component, Fragment } from "react";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { AdvanceTermModal } from "../modals/AdvanceTermModal";
import { ReturnTermModal } from "../modals/ReturnTermModal";
import { SchedulePrintPreview } from "../SchedulePrintPreview";
import { TermsModal } from "../modals/TermsModal";
import { wrap } from "./wrapper";

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

class BaseTermHeader extends Component {
    state = {
        advanceTermModalIsShowing: false,
        returnTermModalIsShowing: false,
        schedulePrintPreviewIsShowing: false,
        termsModalIsShowing: false,
    };

    toggleAdvanceTermModal = shouldShow =>
        this.setState({
            advanceTermModalIsShowing: shouldShow,
        });

    toggleReturnTermModal = shouldShow =>
        this.setState({
            returnTermModalIsShowing: shouldShow,
        });

    toggleSchedulePrintPreview = shouldShow =>
        this.setState({
            schedulePrintPreviewIsShowing: shouldShow,
        });

    toggleTermsModal = shouldShow =>
        this.setState({
            termsModalIsShowing: shouldShow,
        });

    get canMutateTermSchedule() {
        const { user } = this.props;
        return user.permissions.MUTATE_TERM_SCHEDULES;
    }

    get canAdvanceTermSchedule() {
        const { activeTermSchedule } = this.props;
        return (
            this.canMutateTermSchedule &&
            [
                TERM_STATUSES.INITIALIZING.identifier,
                TERM_STATUSES.SCHEDULING.identifier,
                TERM_STATUSES.FEEDBACK_GATHERING.identifier,
            ].includes(activeTermSchedule.status)
        );
    }

    renderButtons = () => {
        const { classes, activeTermSchedule, user } = this.props;
        const canMutateTermSchedule = user.permissions.MUTATE_TERM_SCHEDULES;

        const canReturnTermSchedule =
            canMutateTermSchedule &&
            [
                TERM_STATUSES.SCHEDULING.identifier,
                TERM_STATUSES.FEEDBACK_GATHERING.identifier,
                TERM_STATUSES.PUBLISHED.identifier,
            ].includes(activeTermSchedule.status);

        const canPrintSchedule =
            activeTermSchedule.status === TERM_STATUSES.PUBLISHED.identifier;

        return (
            <Grid
                container
                spacing={16}
                direction="row"
                alignItems="center"
                justify="flex-end"
                wrap="nowrap"
            >
                {canReturnTermSchedule && (
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

                {this.canAdvanceTermSchedule && (
                    <Grid item>
                        <Button
                            variant="raised"
                            color="primary"
                            onClick={() => this.toggleAdvanceTermModal(true)}
                        >
                            {getAdvanceButtonMessage(activeTermSchedule.status)}
                        </Button>
                    </Grid>
                )}

                {canPrintSchedule && (
                    <Grid item>
                        <Button
                            variant="raised"
                            color="primary"
                            onClick={() =>
                                this.toggleSchedulePrintPreview(true)
                            }
                        >
                            <PrintIcon className={classes.printIcon} />
                            Print classes schedule
                        </Button>
                    </Grid>
                )}
            </Grid>
        );
    };

    renderModals = () => {
        const {
            advanceTermModalIsShowing,
            returnTermModalIsShowing,
            schedulePrintPreviewIsShowing,
            termsModalIsShowing,
        } = this.state;

        const { activeTermSchedule } = this.props;

        return (
            <Fragment>
                {this.canAdvanceTermSchedule && (
                    <AdvanceTermModal
                        open={advanceTermModalIsShowing}
                        onClose={() => this.toggleAdvanceTermModal(false)}
                        termSchedule={activeTermSchedule}
                    />
                )}

                <ReturnTermModal
                    open={returnTermModalIsShowing}
                    onClose={() => this.toggleReturnTermModal(false)}
                    termSchedule={activeTermSchedule}
                />

                <SchedulePrintPreview
                    open={schedulePrintPreviewIsShowing}
                    onClose={() => this.toggleSchedulePrintPreview(false)}
                    termSchedule={activeTermSchedule}
                />

                <TermsModal
                    open={termsModalIsShowing}
                    onClose={() => this.toggleTermsModal(false)}
                    activeTermSchedule={activeTermSchedule}
                />
            </Fragment>
        );
    };

    renderTermTitle = () => {
        const { classes, activeTermSchedule } = this.props;
        return (
            <Button
                className={classes.termTitleButton}
                size="large"
                variant="outlined"
                onClick={() => this.toggleTermsModal(true)}
            >
                <Typography className={classes.termTitleText} variant="title">
                    {termScheduleToString(activeTermSchedule)}
                </Typography>
                <ArrowDownIcon />
            </Button>
        );
    };

    render() {
        const { classes, activeTermSchedule } = this.props;
        const activeStepIndex = steps.findIndex(
            step => step.identifier === activeTermSchedule.status
        );

        const isArchived =
            activeTermSchedule.status === TERM_STATUSES.ARCHIVED.identifier;

        return (
            <Paper square elevation={1}>
                <div className={classes.termHeaderContentWrapper}>
                    <Toolbar disableGutters>
                        <Grid
                            container
                            justify="space-between"
                            alignItems="center"
                            wrap="nowrap"
                        >
                            <Grid item xs>
                                {this.renderTermTitle()}
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

                            {!isArchived && (
                                <Grid item xs>
                                    {this.renderButtons()}
                                </Grid>
                            )}
                        </Grid>
                    </Toolbar>

                    {!isArchived && (
                        <Stepper
                            className={classes.stepper}
                            activeStep={activeStepIndex}
                        >
                            {steps.map(({ identifier, name }) => (
                                <Step key={identifier}>
                                    <StepLabel>{name}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    )}
                </div>

                {this.renderModals()}
            </Paper>
        );
    }
}

export const TermHeader = wrap(BaseTermHeader);

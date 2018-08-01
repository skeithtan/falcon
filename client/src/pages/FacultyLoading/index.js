import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../components/states/EmptyState";
import { ErrorState } from "../../components/states/ErrorState";
import {
    termScheduleToString,
    termToPlan,
} from "../../utils/faculty_loading.util";
import { makeURL } from "../../utils/url.util";
import { FacultyLoadingBody } from "./components/FacultyLoadingBody";
import { PlanNextTermModal } from "./components/modals/PlanNextTermModal";
import { wrap } from "./wrapper";
import { TermHeader } from "./components/TermHeader";

class BaseFacultyLoadingPage extends Component {
    state = {
        planNextTermModalIsShowing: false,
    };

    togglePlanNextTermModal = shouldShow =>
        this.setState({
            planNextTermModalIsShowing: shouldShow,
        });

    componentDidMount() {
        document.title = "Faculty Loading - Falcon";
        this.fetchTermSchedules();
        this.handlePath();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handlePath();
    }

    redirectToDefaultTermSchedule = () => {
        const termScheduleToShow = this.getDefaultTermSchedule();

        this.props.history.replace(
            makeURL()
                .facultyLoading()
                .selectTermSchedule(termScheduleToShow._id)
                .mondayThursday()
                .build()
        );
    };

    handlePath = () => {
        const {
            match: {
                params: { termScheduleId },
            },
            termSchedules,
        } = this.props;

        // We need termSchedules to determine how to deal with URL
        // If there are is no defaultTermSchedule, that means there are no term schedules at all
        if (termSchedules === null || !this.getDefaultTermSchedule()) {
            return;
        }

        // If we don't have a selected term schedule
        if (!termScheduleId) {
            // Pick one for the user
            this.redirectToDefaultTermSchedule(termSchedules);
            return;
        }

        const termSchedule = this.getTermScheduleFromId(termScheduleId);

        // If we do have a termScheduleId but it's invalid
        if (!termSchedule) {
            this.redirectToDefaultTermSchedule(termSchedules);
            return;
        }
    };

    getDefaultTermSchedule = () => {
        const { current, archived } = this.props.termSchedules;
        return current ? current : archived[0];
    };

    getTermScheduleFromId = termScheduleId => {
        const { current, archived } = this.props.termSchedules;
        const termSchedules = [...archived];
        if (current) {
            termSchedules.push(current);
        }

        return termSchedules.find(
            termSchedule => termSchedule._id === termScheduleId
        );
    };

    fetchTermSchedules = () => {
        const { isLoading, termSchedules, fetchData } = this.props;
        if (!termSchedules && !isLoading) {
            fetchData();
        }
    };

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderEmptyState = () => {
        const { user } = this.props;

        const showAddButton = Boolean(termToPlan);
        let addButtonText = null;

        if (termToPlan) {
            addButtonText = `Plan ${termScheduleToString(termToPlan)}`;
        }

        return (
            <EmptyState
                bigMessage="There are no term schedules found."
                smallMessage="Term schedules planned will be shown here."
                onAddButtonClick={() => this.togglePlanNextTermModal(true)}
                addButtonText={addButtonText}
                showAddButton={
                    showAddButton && user.permissions.MUTATE_TERM_SCHEDULES
                }
            />
        );
    };

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.fetchTermSchedules}
            message="An error occurred while trying to fetch list of term schedules."
            debug={errors[0]}
        />
    );

    nextTermExists = ({ current, archived }) => {
        const termSchedules = [...archived];

        if (current) {
            termSchedules.push(current);
        }

        // Ensure termToPlan does not already exist in termSchedules
        for (const { startYear, term } of termSchedules) {
            if (startYear !== termToPlan.startYear) {
                continue;
            }

            if (term === termToPlan.term) {
                return true;
            }
        }
        return false;
    };

    get shouldShowPlanNextTerm() {
        const { termSchedules } = this.props;

        if (!termSchedules) {
            return false;
        }

        if (!termToPlan) {
            return false;
        }

        return !this.nextTermExists(termSchedules);
    }

    renderPlanNextTermBanner = () => {
        const { classes } = this.props;
        return (
            <Paper square className={classes.planNextTermBanner}>
                <div className={classes.bannerContentContainer}>
                    <Typography
                        className={classes.bannerText}
                        variant="title"
                        color="inherit"
                    >
                        {termScheduleToString(termToPlan)} is coming.
                    </Typography>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={() => this.togglePlanNextTermModal(true)}
                    >
                        Begin planning next term
                    </Button>
                </div>
            </Paper>
        );
    };

    renderFacultyLoading = (termSchedule, meetingDays) => {
        const { classes } = this.props;

        document.title = `${termScheduleToString(
            termSchedule
        )} - Faculty Loading - Falcon`;

        return (
            <Grid
                container
                className={classes.facultyLoadingTermViewContainer}
                direction="column"
                wrap="nowrap"
            >
                {this.shouldShowPlanNextTerm && (
                    <Grid item>{this.renderPlanNextTermBanner()}</Grid>
                )}
                <Grid item>
                    <TermHeader activeTermSchedule={termSchedule} />
                </Grid>
                <Grid item xs>
                    <FacultyLoadingBody
                        activeTermSchedule={termSchedule}
                        meetingDays={meetingDays}
                    />
                </Grid>
            </Grid>
        );
    };

    render() {
        const {
            classes,
            match: {
                params: { termScheduleId, meetingDay },
            },
            isLoading,
            termSchedules,
            errors,
        } = this.props;

        const { planNextTermModalIsShowing } = this.state;
        const termSchedule =
            termSchedules !== null &&
            this.getTermScheduleFromId(termScheduleId);

        const noTermSchedules =
            termSchedules !== null && !this.getDefaultTermSchedule();

        return (
            <div className={classes.facultyLoadingContainer}>
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
                {noTermSchedules && this.renderEmptyState()}

                {termSchedule &&
                    this.renderFacultyLoading(termSchedule, meetingDay)}

                {this.shouldShowPlanNextTerm && (
                    <PlanNextTermModal
                        open={planNextTermModalIsShowing}
                        onClose={() => this.togglePlanNextTermModal(false)}
                    />
                )}
            </div>
        );
    }
}

export const FacultyLoadingPage = wrap(BaseFacultyLoadingPage);

import Grid from "@material-ui/core/Grid";
import React, { Component, Fragment } from "react";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../components/states/EmptyState";
import { ErrorState } from "../../components/states/ErrorState";
import { TERM_STATUSES } from "../../enums/class.enums";
import { formatAcademicYear, termScheduleToString, termToPlan } from "../../utils/faculty_loading.util";
import { makeURL } from "../../utils/url.util";
import { FacultyLoadingBody } from "./components/FacultyLoadingBody";
import { FacultyLoadingHeader } from "./components/FacultyLoadingHeader";
import { PlanNextTermModal } from "./components/modals/PlanNextTermModal";
import { wrap } from "./wrapper";


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

    componentDidUpdate() {
        this.handlePath();
    }

    redirectToDefaultTermSchedule = termSchedules => {
        const termScheduleToShow = this.getDefaultTermSchedule(termSchedules);

        this.props.history.replace(
            makeURL()
                .facultyLoading()
                .selectTermSchedule(termScheduleToShow._id)
                .mondayThursday()
                .build(),
        );
    };

    handlePath = () => {
        const {
            match: {
                params: {termScheduleId, meetingDay},
            },
            history,
            termSchedules,
        } = this.props;

        // We need termSchedules to determine how to deal with URL
        if (!termSchedules || termSchedules.length === 0) {
            return;
        }

        // If we don't have a selected term schedule
        if (!termScheduleId) {
            // Pick one for the user
            this.redirectToDefaultTermSchedule(termSchedules);
            return;
        }

        const termSchedule = this.getTermScheduleFromId(
            termSchedules,
            termScheduleId,
        );

        // If we do have a termScheduleId but it's invalid
        if (!termSchedule) {
            this.redirectToDefaultTermSchedule(termSchedules);
            return;
        }

        if (!meetingDay) {
            history.replace(
                makeURL()
                    .facultyLoading()
                    .selectTermSchedule(termScheduleId)
                    .mondayThursday()
                    .build(),
            );
        }

        if (!this.meetingDayIsValid(meetingDay)) {
            history.replace(
                makeURL()
                    .facultyLoading()
                    .selectTermSchedule(termScheduleId)
                    .mondayThursday()
                    .build(),
            );
        }
    };

    meetingDayIsValid = meetingDay => ["monday-thursday", "tuesday-friday"].includes(meetingDay);

    getDefaultTermSchedule = termSchedules => {
        // Find the current term schedule
        let termScheduleToShow = termSchedules.find(
            termSchedule =>
                termSchedule.status !== TERM_STATUSES.ARCHIVED.identifier,
        );

        // If we can't find one that isn't archived
        if (!termScheduleToShow) {
            // Just get the first one
            termScheduleToShow = termSchedules[0];
        }

        return termScheduleToShow;
    };

    getTermScheduleFromId = (termSchedules, termScheduleId) =>
        termSchedules.find(termSchedule => termSchedule._id === termScheduleId);

    fetchTermSchedules = () => {
        const {isLoading, termSchedules, fetchData} = this.props;
        if (!termSchedules && !isLoading) {
            fetchData();
        }
    };

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderEmptyState = () => {
        const {user} = this.props;

        const showAddButton = Boolean(termToPlan);
        let addButtonText = null;

        if (termToPlan) {
            addButtonText = `Plan ${
                termToPlan.term.name
                } Term of ${formatAcademicYear(termToPlan.startYear)}`;
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

    nextTermExists = termSchedules => {
        // Ensure termToPlan does not already exist in termSchedules
        return termSchedules.every(({startYear, term}) => {
            return (
                startYear !== termToPlan.startYear &&
                term !== termToPlan.term.identifier
            );
        });
    };

    get shouldShowPlanNextTermModal() {
        const {termSchedules} = this.props;

        if (!termSchedules) {
            return false;
        }

        if (!termToPlan) {
            return false;
        }

        return this.nextTermExists(termSchedules);
    }

    renderFacultyLoading = (termSchedule, meetingDays) => {
        document.title = `${termScheduleToString(termSchedule)} - Faculty Loading - Falcon`;
        return (
            <Fragment>
                <FacultyLoadingHeader activeTermSchedule={termSchedule} meetingDays={meetingDays} />
                <FacultyLoadingBody activeTermSchedule={termSchedule} meetingDays={meetingDays} />
            </Fragment>
        );
    };

    render() {
        const {
            classes,
            match: {
                params: {termScheduleId, meetingDay},
            },
            isLoading,
            termSchedules,
            errors,
        } = this.props;

        const {planNextTermModalIsShowing} = this.state;
        const termSchedule = termSchedules && this.getTermScheduleFromId(termSchedules, termScheduleId);
        const meetingDayIsValid = this.meetingDayIsValid(meetingDay);

        return (
            <div className={classes.facultyLoadingContainer}>
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
                {termSchedules && termSchedules.length === 0 && this.renderEmptyState()}
                {termSchedule && meetingDayIsValid && this.renderFacultyLoading(termSchedule, meetingDay)}

                {this.shouldShowPlanNextTermModal && (
                    <PlanNextTermModal
                        open={planNextTermModalIsShowing}
                        onClose={() => this.togglePlanNextTermModal(false)}
                        term={termToPlan.term}
                        startYear={termToPlan.startYear}
                    />
                )}
            </div>
        );
    }
}

export const FacultyLoadingPage = wrap(BaseFacultyLoadingPage);

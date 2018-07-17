import Grid from "@material-ui/core/Grid";
import React, { Component, Fragment } from "react";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../components/states/EmptyState";
import { ErrorState } from "../../components/states/ErrorState";
import {
    formatAcademicYear,
    termScheduleToString,
    termToPlan,
} from "../../utils/faculty_loading.util";
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
        if (
            termSchedules === null ||
            !this.getDefaultTermSchedule()
        ) {
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

        return termSchedules.find(termSchedule => termSchedule._id === termScheduleId);
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
        return termSchedules.every(({ startYear, term }) => {
            return (
                startYear !== termToPlan.startYear &&
                term !== termToPlan.term.identifier
            );
        });
    };

    get shouldShowPlanNextTermModal() {
        const { termSchedules } = this.props;

        if (!termSchedules) {
            return false;
        }

        if (!termToPlan) {
            return false;
        }

        return this.nextTermExists(termSchedules);
    }

    renderFacultyLoading = (termSchedule, meetingDays) => {
        document.title = `${termScheduleToString(
            termSchedule
        )} - Faculty Loading - Falcon`;
        return (
            <Fragment>
                <FacultyLoadingHeader
                    activeTermSchedule={termSchedule}
                    meetingDays={meetingDays}
                />
                <FacultyLoadingBody
                    activeTermSchedule={termSchedule}
                    meetingDays={meetingDays}
                />
            </Fragment>
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

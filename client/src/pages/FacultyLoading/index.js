import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { EmptyState } from "../../components/states/EmptyState";
import {
    termToPlan,
    formatAcademicYear,
} from "../../utils/faculty_loading.util";
import { wrap } from "./wrapper";
import { PlanNextTermModal } from "./components/modals/PlanNextTermModal";

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
    }

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
        const showAddButton = Boolean(termToPlan);
        let addButtonText = null;

        if (termToPlan) {
            addButtonText = `Plan ${
                termToPlan.term.name
            } Term of ${formatAcademicYear(termToPlan.startYear)}`;
        }

        return (
            <EmptyState
                bigMessage="There are no term schedules found"
                smallMessage="Term schedules planned will be shown here"
                onAddButtonClick={() => this.togglePlanNextTermModal(true)}
                addButtonText={addButtonText}
                showAddButton={showAddButton}
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

    render() {
        const { classes, isLoading, termSchedules, errors } = this.props;
        const { planNextTermModalIsShowing } = this.state;

        return (
            <div className={classes.facultyLoadingContainer}>
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
                {termSchedules &&
                    termSchedules.length === 0 &&
                    this.renderEmptyState()}
                {termSchedules && termSchedules.length > 0 && "TODO"}

                {this.shouldShowPlanNextTermModal && (
                    <PlanNextTermModal
                        isOpen={planNextTermModalIsShowing}
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

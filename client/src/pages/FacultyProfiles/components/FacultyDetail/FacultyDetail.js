import Typography from "@material-ui/core/Typography";
import React, { Component, createElement } from "react";
import { DetailCard } from "../../../../components/DetailCard";
import { FullPageLoadingIndicator } from "../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../components/states/ErrorState";
import { TABS } from "../faculty_detail_tabs";


export class FacultyDetail extends Component {
    // Fixes error in console, but not necessary
    state = {};

    renderSelectFacultyState = () => (
        <div className={this.props.classes.selectFacultyState}>
            <Typography variant="headline" className={this.props.classes.selectFacultyText}>
                Select a faculty from the left to see the details
            </Typography>
        </div>
    );

    renderLoading = () => {
        return <FullPageLoadingIndicator size={100} />;
    };

    renderErrors = errors => (
        <div className={this.props.classes.cardsContainer}>
            <DetailCard>
                <ErrorState onRetryButtonClick={() => this.props.getFacultyDetails(this.props.activeFaculty)}
                            message="An error occurred while trying to fetch faculty details."
                            debug={errors[0]} />
            </DetailCard>
        </div>
    );

    renderTab = () => React.createElement(this.props.activeTab.component, {
        faculty: this.props.activeFaculty,
        classes: this.props.classes
    });

    renderTabs = () => (
        <div className={this.props.classes.facultyDetail}>
            {this.renderTab()}
        </div>
    );

    static getDerivedStateFromProps(nextProps, prevState) {
        const {activeFaculty, getFacultyDetails, setDetailsFetched, errors} = nextProps;
        if (!activeFaculty) {
            return prevState;
        }
        // Do not fetch if there is an error showing
        if (errors) {
            return prevState;
        }

        // Overview would have been fetched if birthDate exists
        if (!activeFaculty.birthDate) {
            getFacultyDetails(activeFaculty);
            return prevState;
        }
        setDetailsFetched();
        return prevState;
    }

    render() {
        const {isLoading, errors, activeFaculty, isFetched} = this.props;
        if (!activeFaculty) {
            return this.renderSelectFacultyState();
        }
        if (isLoading) {
            return this.renderLoading();
        }
        if (errors) {
            return this.renderErrors(errors);
        }
        if (isFetched) {
            return this.renderTabs();
        }
        return null;
    }
}


import Typography from "@material-ui/core/Typography";
import React, { Component, createElement } from "react";
import SwipeableViews from "react-swipeable-views";
import DetailCard from "../../../../components/DetailCard";
import FullPageLoadingIndicator from "../../../../components/FullPageLoadingIndicator";
import ErrorState from "../../../../components/states/ErrorState";
import { TABS } from "../faculty_detail_tabs";


export default class FacultyDetail extends Component {
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
        <div className={this.props.classes.cards}>
            <DetailCard>
                <ErrorState onRetryButtonClick={() => this.props.getFacultyDetails(this.props.activeFaculty)}
                            message="An error occurred while trying to fetch faculty details."
                            debug={errors[0]} />
            </DetailCard>
        </div>
    );

    renderTabs = () => {
        const {activeTab, classes, onTabChange, activeFaculty} = this.props;
        const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTab.identifier);
        const tabComponents = TABS.map(tab =>
            createElement(tab.component, {faculty: activeFaculty, classes: classes, key: tab.identifier}),
        );

        function handleChangeIndex(newIndex) {
            onTabChange(TABS[newIndex]);
        }

        return (
            <div className={classes.facultyDetail}>
                <SwipeableViews index={activeTabIndex} onChangeIndex={handleChangeIndex}>
                    {tabComponents}
                </SwipeableViews>
            </div>
        );
    };

    static getDerivedStateFromProps(nextProps) {
        const {activeFaculty, getFacultyDetails, setDetailsFetched, errors} = nextProps;
        if (!activeFaculty) {
            return {};
        }
        // Do not fetch if there is an error showing
        if (errors) {
            return {};
        }

        // Overview would have been fetched if birthDate exists
        if (!activeFaculty.birthDate) {
            getFacultyDetails(activeFaculty);
            return {};
        }
        setDetailsFetched();
        return {};
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


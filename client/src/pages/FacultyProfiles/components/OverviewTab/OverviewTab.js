import React, { Component } from "react";
import FullPageLoadingIndicator from "../../../../components/FullPageLoadingIndicator";
import ErrorState from "../../../../components/states/ErrorState";

import DetailCard from "../DetailCard";
import OverviewCard from "../cards/OverviewCard";
import DegreeCard from "../cards/DegreeCard";
import RecognitionsCard from "../cards/RecognitionsCard";


class OverviewTab extends Component {

    renderOverviewCards = () => (
        <div className={this.props.classes.cards}>
            <OverviewCard faculty={this.props.activeFaculty} key={1} />
            <DegreeCard faculty={this.props.activeFaculty} key={2} />
            <RecognitionsCard faculty={this.props.activeFaculty} key={3} />
        </div>
    );


    renderLoading = () => {
        return <FullPageLoadingIndicator size={100} />;
    };

    renderError = errors => (
        <div className={this.props.classes.cards}>
            <DetailCard>
                <ErrorState onRetryButtonClick={() => this.props.getFacultyOverview(this.props.activeFaculty)}
                            message="An error occurred while trying to fetch faculty overview."
                            debug={errors[0]} />
            </DetailCard>
        </div>
    );

    static getDerivedStateFromProps(nextProps) {
        const {activeFaculty, getFacultyOverview, setOverviewFetched, errors} = nextProps;

        // Do not fetch if there is an error showing
        if (errors) {
            return {};
        }

        // Overview would have been fetched if birthDate exists
        if (!activeFaculty.birthDate) {
            getFacultyOverview(activeFaculty);
        } else {
            setOverviewFetched();
        }

        return {};
    }

    render() {
        const {isLoading, errors} = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderError(errors);
        }

        return this.renderOverviewCards();
    }

}

export default OverviewTab;

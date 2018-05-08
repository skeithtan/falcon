import React, { Component } from "react";
import FullPageLoadingIndicator from "../../../../components/FullPageLoadingIndicator";

import OverviewCard from "../cards/OverviewCard";
import DegreeCard from "../cards/DegreeCard";

class OverviewTab extends Component {

    renderOverviewCards = () => (
        <div className={this.props.classes.cards}>
            <OverviewCard faculty={this.props.activeFaculty} key={1} />
            <DegreeCard faculty={this.props.activeFaculty} key={2} />
        </div>
    );


    renderLoading = () => {
        return <FullPageLoadingIndicator size={100} />;
    };

    renderError = errors => {
        console.log("Error", errors);

        return null;
    };

    static getDerivedStateFromProps(nextProps) {
        const {activeFaculty, getFacultyOverview, setOverviewFetched} = nextProps;

        // Overview would have been fetched if birthDate exists
        if (!activeFaculty.birthDate) {
            getFacultyOverview(activeFaculty);
        } else {
            setOverviewFetched();
        }

        return {};
    }

    render() {
        const {isLoading, errors, overviewIsFetched} = this.props;


        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderError(errors);
        }

        if (overviewIsFetched) {
            return this.renderOverviewCards();
        }

        return null;
    }

}

export default OverviewTab;

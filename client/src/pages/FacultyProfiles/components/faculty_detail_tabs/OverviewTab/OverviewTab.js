import React, { Component } from "react";
import FullPageLoadingIndicator from "../../../../../components/FullPageLoadingIndicator/index";
import ErrorState from "../../../../../components/states/ErrorState/index";
import TeachingSubjectsCard from "../../cards/TeachingSubjectsCard/index";

import DetailCard from "../../../../../components/DetailCard/index";
import OverviewCard from "../../cards/OverviewCard/index";
import DegreeCard from "../../cards/DegreeCard/index";
import RecognitionsCard from "../../cards/RecognitionsCard/index";


class OverviewTab extends Component {
    render() {
        return (
            <div className={this.props.classes.cards}>
                <OverviewCard faculty={this.props.activeFaculty} />
                <DegreeCard faculty={this.props.activeFaculty} />
                <RecognitionsCard faculty={this.props.activeFaculty} />
                <TeachingSubjectsCard faculty={this.props.activeFaculty} />
            </div>
        );
    }

}

export default OverviewTab;

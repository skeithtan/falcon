import React, { Component } from "react";
import DegreeCard from "../../cards/DegreeCard/index";
import OverviewCard from "../../cards/OverviewCard/index";
import RecognitionsCard from "../../cards/RecognitionsCard/index";
import TeachingSubjectsCard from "../../cards/TeachingSubjectsCard/index";


class OverviewTab extends Component {
    render() {
        return (
            <div className={this.props.classes.cards}>
                <OverviewCard faculty={this.props.faculty} />
                <DegreeCard faculty={this.props.faculty} />
                <RecognitionsCard faculty={this.props.faculty} />
                <TeachingSubjectsCard faculty={this.props.faculty} />
            </div>
        );
    }
}

export default OverviewTab;

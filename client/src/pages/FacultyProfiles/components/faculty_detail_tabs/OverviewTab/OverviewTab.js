import React, { Component } from "react";
import DegreeCard from "../../cards/DegreeCard";
import OverviewCard from "../../cards/OverviewCard";
import RecognitionsCard from "../../cards/RecognitionsCard";
import TeachingSubjectsCard from "../../cards/TeachingSubjectsCard";


class OverviewTab extends Component {
    render() {
        return (
            <div className={this.props.classes.cardsContainer}>
                <OverviewCard faculty={this.props.faculty} />
                <DegreeCard faculty={this.props.faculty} />
                <RecognitionsCard faculty={this.props.faculty} />
                <TeachingSubjectsCard faculty={this.props.faculty} />
            </div>
        );
    }
}

export default OverviewTab;

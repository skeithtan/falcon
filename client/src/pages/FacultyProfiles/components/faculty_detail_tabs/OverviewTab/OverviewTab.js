import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import DegreeCard from "../../cards/DegreeCard";
import OverviewCard from "../../cards/OverviewCard";
import RecognitionsCard from "../../cards/RecognitionsCard";
import TeachingSubjectsCard from "../../cards/TeachingSubjectsCard";


class OverviewTab extends Component {
    render() {
        return (
            <div className={this.props.classes.cardsContainer}>
                <Grid container spacing={16} alignItems="stretch" direction="column">
                    <Grid item>
                        <OverviewCard faculty={this.props.faculty} />
                    </Grid>
                    <Grid item>
                        <DegreeCard faculty={this.props.faculty} />
                    </Grid>
                    <Grid item>
                        <RecognitionsCard faculty={this.props.faculty} />
                    </Grid>
                    <Grid item>
                        <TeachingSubjectsCard faculty={this.props.faculty} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default OverviewTab;

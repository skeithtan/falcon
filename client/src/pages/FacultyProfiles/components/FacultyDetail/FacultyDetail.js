import React, { Component } from "react";
import Typography from "material-ui/Typography";

import OverviewDetail from "../OverviewTab";

export default class FacultyDetail extends Component {

    emptyState = () => (
        <div className={this.props.classes.emptyState}>
            <Typography variant="headline" className={this.props.classes.emptyStateText}>
                Select a faculty from the left to see the details
            </Typography>
        </div>
    );

    renderCards = () => (
        <OverviewDetail />
    );

    render() {
        const {classes, activeFacultyId} = this.props;

        let view;

        view = activeFacultyId ? this.renderCards() : this.emptyState();

        return (
            <div className={classes.facultyDetail}>
                {view}
            </div>
        );
    }
}


import React, { Component } from "react";
import Typography from "material-ui/Typography";

import OverviewDetail from "../OverviewCard";

export default class FacultyDetail extends Component {

    emptyState = () => (
        <div>
            <Typography variant="display1">
                Select a faculty from the left to see the details
            </Typography>
        </div>
    );

    renderCards = faculty => (
        <OverviewDetail faculty={faculty}/>
    );

    render() {
        const {classes, activeFaculty} = this.props;

        let view;

        view = activeFaculty ? this.renderCards(activeFaculty) : this.emptyState();

        return (
            <div className={classes.facultyDetail}>
                {view}
            </div>
        );
    }
}


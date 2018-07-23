import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { FacultyScheduleCards } from "../../../../components/FacultyScheduleCards";
import { wrap } from "./wrapper";

class BasePublishedState extends Component {
    renderActions = () => {
        return null; //TODO: Print
    };

    renderToolbar = () => {
        const { termSchedule, classes } = this.props;

        return (
            <Card className={classes.toolbarContainer}>
                <Grid
                    container
                    direction="row"
                    spacing={16}
                    wrap="nowrap"
                    justify="space-between"
                >
                    <Grid item>
                        <Typography variant="title">
                            Your schedule for{" "}
                            {termScheduleToString(termSchedule)}
                        </Typography>
                    </Grid>
                    <Grid item>{this.renderActions()}</Grid>
                </Grid>
            </Card>
        );
    };

    render() {
        const { termSchedule } = this.props;
        return (
            <Grid
                spacing={16}
                container
                direction="column"
                justify="center"
                wrap="nowrap"
            >
                <Grid item>{this.renderToolbar()}</Grid>

                <Grid item>
                    <FacultyScheduleCards
                        assignedClasses={termSchedule.classes}
                    />
                </Grid>
            </Grid>
        );
    }
}

export const PublishedState = wrap(BasePublishedState);

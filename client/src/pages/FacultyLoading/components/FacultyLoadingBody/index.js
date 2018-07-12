import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { PureComponent } from "react";
import { OverviewCard } from "../cards/OverviewCard";
import { wrap } from "./wrapper";
import { ScheduleCard } from "../cards/ScheduleCard";
import { FacultiesCard } from "../cards/FacultiesCard";

class BaseFacultyLoadingBody extends PureComponent {
    renderScheduleFaculties = (activeTermSchedule, meetingDays) => (
        <Grid
            container
            className={this.props.classes.scheduleFacultiesContainer}
            spacing={16}
            direction="row"
            alignItems="stretch"
        >
            <Grid item xs={3}>
                <FacultiesCard
                    facultyResponses={activeTermSchedule.facultyPool}
                    meetingDays={meetingDays}
                />
            </Grid>
            <Grid item xs={9}>
                <ScheduleCard
                    activeTermSchedule={activeTermSchedule}
                    meetingDays={meetingDays}
                />
            </Grid>
        </Grid>
    );

    render() {
        const { classes, activeTermSchedule, meetingDays } = this.props;
        return (
            <div className={classes.facultyLoadingBody}>
                <div className={classes.cardsContainer}>
                    <Grid
                        container
                        className={this.props.classes.scheduleFacultiesContainer}
                        spacing={16}
                        alignItems="stretch"
                        direction="column"
                        wrap="nowrap"
                    >
                        <Grid item>
                            <OverviewCard
                                activeTermSchedule={activeTermSchedule}
                                meetingDays={meetingDays}
                            />
                        </Grid>
                        <Grid item xs>
                            {this.renderScheduleFaculties(
                                activeTermSchedule,
                                meetingDays
                            )}
                        </Grid>
                    </Grid>
                </div>

                <Button
                    variant="extendedFab"
                    color="primary"
                    className={classes.floatingActionButton}
                >
                    <AddIcon />
                    Add Class
                </Button>
            </div>
        );
    }
}

export const FacultyLoadingBody = wrap(BaseFacultyLoadingBody);

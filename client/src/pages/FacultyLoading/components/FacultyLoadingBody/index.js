import React, { PureComponent } from "react";
import { OverviewCard } from "../cards/OverviewCard";
import { wrap } from "./wrapper";
import Grid from "@material-ui/core/Grid";
import { ScheduleCard } from "../cards/ScheduleCard";
import { FacultiesCard } from "../cards/FacultiesCard";

class BaseFacultyLoadingBody extends PureComponent {
    renderScheduleFaculties = (activeTermSchedule, meetingDays) => (
        <Grid container spacing={16} direction="row" alignItems="stretch">
            <Grid item xs={3}>
                <FacultiesCard
                    activeTermSchedule={activeTermSchedule}
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
                        <Grid item>
                            {this.renderScheduleFaculties(
                                activeTermSchedule,
                                meetingDays
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export const FacultyLoadingBody = wrap(BaseFacultyLoadingBody);

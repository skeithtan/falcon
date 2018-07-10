import React, { PureComponent, Fragment } from "react";
import { MEETING_HOURS } from "../../../../enums/class.enums";
import Grid from "@material-ui/core/Grid";
import { wrap } from "./wrapper";
import Typography from "@material-ui/core/Typography";

class CalendarColumn extends PureComponent {
    render() {
        const { meetingHours, classes } = this.props;
        return (
            <div>
                <div className={classes.calendarColumnHead}>
                    <Typography color="textSecondary" align="center">
                        {meetingHours}
                    </Typography>
                </div>
            </div>
        );
    }
}

class BaseScheduleCalendar extends PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.scheduleCalendarContainer}>
                {Object.values(MEETING_HOURS).map(meetingHours => (
                    <Grid item xs key={meetingHours.identifier}>
                        <CalendarColumn
                            meetingHours={meetingHours.name}
                            classes={classes}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export const ScheduleCalendar = wrap(BaseScheduleCalendar);

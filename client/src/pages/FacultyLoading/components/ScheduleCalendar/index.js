import React, { PureComponent } from "react";
import { MEETING_HOURS } from "../../../../enums/class.enums";
import Grid from "@material-ui/core/Grid";
import { wrap } from "./wrapper";
import Typography from "@material-ui/core/Typography";
import { ClassScheduleItem } from "../ClassScheduleItem";

class CalendarClassesColumn extends PureComponent {
    render() {
        const {
            classSchedules,
            faculties,
            subjects,
            termSchedule,
            activeClassSchedule,
            setActiveClassSchedule,
            toggleUpdateClassScheduleModal,
            toggleRemoveClassScheduleModal,
        } = this.props;
        return (
            <Grid container spacing={8} direction="column" wrap="nowrap">
                {classSchedules.map(classSchedule => (
                    <Grid item key={classSchedule._id}>
                        <ClassScheduleItem
                            classSchedule={classSchedule}
                            faculty={
                                classSchedule.faculty &&
                                faculties.find(
                                    faculty =>
                                        faculty._id === classSchedule.faculty
                                )
                            }
                            subject={subjects.find(
                                subject => subject._id === classSchedule.subject
                            )}
                            termSchedule={termSchedule}
                            active={activeClassSchedule && activeClassSchedule._id === classSchedule._id}
                            setActiveClassSchedule={setActiveClassSchedule}
                            toggleUpdateClassScheduleModal={
                                toggleUpdateClassScheduleModal
                            }
                            toggleRemoveClassScheduleModal={
                                toggleRemoveClassScheduleModal
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

class BaseScheduleCalendar extends PureComponent {
    renderCalendarHeader = () => (
        <Grid
            className={this.props.classes.calendarColumnHead}
            container
            spacing={8}
            direction="row"
            wrap="nowrap"
        >
            {Object.values(MEETING_HOURS).map(({ name, identifier }) => (
                <Grid item xs={2} key={identifier}>
                    <Typography color="textSecondary" align="center">
                        {name}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );

    renderCalendarBody = () => {
        const {
            classSchedules,
            faculties,
            subjects,
            activeClassSchedule,
            termSchedule,
            setActiveClassSchedule,
            toggleUpdateClassScheduleModal,
            toggleRemoveClassScheduleModal,
        } = this.props;
        return (
            <Grid container spacing={8} direction="row" wrap="nowrap">
                {Object.values(MEETING_HOURS).map(meetingHours => (
                    <Grid item xs={2} key={meetingHours.identifier}>
                        <CalendarClassesColumn
                            classes={this.props.classes}
                            classSchedules={classSchedules.filter(
                                classSchedule =>
                                    classSchedule.meetingHours ===
                                    meetingHours.identifier
                            )}
                            faculties={faculties}
                            subjects={subjects}
                            termSchedule={termSchedule}
                            activeClassSchedule={activeClassSchedule}
                            setActiveClassSchedule={setActiveClassSchedule}
                            toggleUpdateClassScheduleModal={
                                toggleUpdateClassScheduleModal
                            }
                            toggleRemoveClassScheduleModal={
                                toggleRemoveClassScheduleModal
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };
    render() {
        const { classes } = this.props;
        return (
            <Grid
                className={classes.scheduleCalendarContainer}
                container
                direction="column"
                alignItems="stretch"
                wrap="nowrap"
            >
                <Grid item>{this.renderCalendarHeader()}</Grid>
                <Grid item xs className={classes.scheduleCalendarBodyContainer}>
                    {this.renderCalendarBody()}
                </Grid>
            </Grid>
        );
    }
}

export const ScheduleCalendar = wrap(BaseScheduleCalendar);

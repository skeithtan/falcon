import React, { PureComponent, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { FacultyChip } from "../../../../components/FacultyChip";
import { MEETING_DAYS, MEETING_HOURS } from "../../../../enums/class.enums";
import { wrap } from "./wrapper";

class BaseClassSchedulePopover extends PureComponent {
    renderButtons = () => (
        <Fragment>
            <Button color="primary">Update class</Button>
            <Button color="primary">Remove class</Button>
        </Fragment>
    );

    renderOverview = () => {
        const { subject, classSchedule } = this.props;
        return (
            <Fragment>
                <Typography variant="subheading">{subject.name}</Typography>
                <Typography color="textSecondary">
                    {classSchedule.course}
                </Typography>
                <Typography color="textSecondary">
                    {classSchedule.section}
                </Typography>
            </Fragment>
        );
    };

    renderSchedule = () => {
        const {
            classSchedule: { meetingHours, meetingDays },
        } = this.props;

        const meetingDaysName = MEETING_DAYS[meetingDays].name;
        const meetingHoursName = MEETING_HOURS[meetingHours].name;

        return (
            <Fragment>
                <Typography>{meetingDaysName}</Typography>
                <Typography>{meetingHoursName}</Typography>
            </Fragment>
        );
    };

    renderFaculty = () => {
        const { faculty } = this.props;

        if (!faculty) {
            return (
                <Typography color="textSecondary">
                    No assigned faculty
                </Typography>
            );
        }

        return <FacultyChip clickable faculty={faculty} />;
    };

    render() {
        const { open, onClose, anchorEl, classes } = this.props;
        return (
            <Popover
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <CardContent className={classes.popoverContainer}>
                    <Grid
                        container
                        spacing={24}
                        direction="column"
                        alignItems="flex-start"
                        wrap="nowrap"
                    >
                        <Grid item>{this.renderOverview()}</Grid>
                        <Grid item>{this.renderSchedule()}</Grid>
                        <Grid item>{this.renderFaculty()}</Grid>
                    </Grid>
                </CardContent>
                <CardActions>{this.renderButtons()}</CardActions>
            </Popover>
        );
    }
}

export const ClassSchedulePopover = wrap(BaseClassSchedulePopover);

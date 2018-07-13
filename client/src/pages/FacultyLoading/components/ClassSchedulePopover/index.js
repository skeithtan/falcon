import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { FacultyChip } from "../../../../components/FacultyChip";
import { MEETING_DAYS, MEETING_HOURS } from "../../../../enums/class.enums";
import { wrap } from "./wrapper";
import { RemoveClassScheduleModal } from "../modals/RemoveClassScheduleModal";

class BaseClassSchedulePopover extends Component {
    state = {
        removeClassScheduleModalIsShowing: false,
    };

    toggleRemoveClassScheduleModal = shouldShow =>
        this.setState({
            removeClassScheduleModalIsShowing: shouldShow,
        });

    renderButtons = () => (
        <Fragment>
            <Button color="primary">Update class</Button>
            <Button
                color="primary"
                onClick={() => this.toggleRemoveClassScheduleModal(true)}
            >
                Remove class
            </Button>
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
        const {
            open,
            onClose,
            anchorEl,
            classes,
            classSchedule,
            subject,
            onRemoveClassSchedule
        } = this.props;
        const { removeClassScheduleModalIsShowing } = this.state;

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

                <RemoveClassScheduleModal
                    open={removeClassScheduleModalIsShowing}
                    onClose={() => this.toggleRemoveClassScheduleModal(false)}
                    onRemoveClassSchedule={onRemoveClassSchedule}
                    classSchedule={classSchedule}
                    subject={subject}
                />
            </Popover>
        );
    }
}

export const ClassSchedulePopover = wrap(BaseClassSchedulePopover);

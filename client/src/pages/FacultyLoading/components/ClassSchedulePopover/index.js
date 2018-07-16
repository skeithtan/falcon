import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { FacultyChip } from "../../../../components/FacultyChip";
import {
    MEETING_DAYS,
    MEETING_HOURS,
    TERM_STATUSES,
} from "../../../../enums/class.enums";
import { wrap } from "./wrapper";
import { RemoveClassScheduleModal } from "../modals/RemoveClassScheduleModal";
import { makeURL } from "../../../../utils/url.util";

class BaseClassSchedulePopover extends Component {
    state = {
        removeClassScheduleModalIsShowing: false,
    };

    toggleRemoveClassScheduleModal = shouldShow =>
        this.setState({
            removeClassScheduleModalIsShowing: shouldShow,
        });

    renderButtons = () => (
        <Grid container justify="space-between" alignItems="flex-end">
            <Grid item>
                <Button color="primary">Update class</Button>
            </Grid>
            {this.shouldShowRemoveTermSchedule && (
                <Grid item>
                    <Button
                        color="primary"
                        onClick={() =>
                            this.toggleRemoveClassScheduleModal(true)
                        }
                    >
                        Remove class
                    </Button>
                </Grid>
            )}
        </Grid>
    );

    renderOverview = () => {
        const { subject, classSchedule, history } = this.props;

        const onSubjectClick = () =>
            history.push(
                makeURL()
                    .subjects()
                    .selectSubject(subject._id)
                    .build()
            );

        return (
            <Fragment>
                <Grid
                    container
                    spacing={8}
                    direction="row"
                    justify="space-between"
                    wrap="nowrap"
                >
                    <Grid item xs>
                        <Typography variant="subheading">
                            {subject.name}{" "}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip disableFocusListener title="View subject">
                            <IconButton
                                aria-label="View subject"
                                onClick={onSubjectClick}
                            >
                                <OpenInNewIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
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

    get shouldShowRemoveTermSchedule() {
        const { termSchedule } = this.props;
        return termSchedule.status === TERM_STATUSES.INITIALIZING.identifier;
    }

    render() {
        const {
            open,
            onClose,
            anchorEl,
            classes,
            classSchedule,
            subject,
            termSchedule,
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

                {this.shouldShowRemoveTermSchedule && (
                    <RemoveClassScheduleModal
                        open={removeClassScheduleModalIsShowing}
                        onClose={() =>
                            this.toggleRemoveClassScheduleModal(false)
                        }
                        classSchedule={classSchedule}
                        termSchedule={termSchedule}
                        subject={subject}
                    />
                )}
            </Popover>
        );
    }
}

export const ClassSchedulePopover = wrap(BaseClassSchedulePopover);

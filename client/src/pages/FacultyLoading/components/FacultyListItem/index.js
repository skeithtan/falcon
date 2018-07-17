import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DragIndicator from "@material-ui/icons/DragIndicator";
import Grid from "@material-ui/core/Grid";
import { UserAvatar } from "../../../../components/UserAvatar";
import { getFullName } from "../../../../utils/user.util";
import { wrap } from "./wrapper";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { StatusChip } from "../StatusChip";

class BaseFacultyListItem extends Component {
    renderFeedbackGatheringInfo = (faculty, facultyResponse, termSchedule) => {
        return null; // TODO
    };

    renderSchedulingInfo = (faculty, facultyResponse, termSchedule) => {
        return null; // TODO
    };

    renderInitializingInfo = (faculty, facultyResponse, termSchedule) => {
        const pendingAvailability = facultyResponse.availability === null;

        return (
            <Grid container direction="column" wrap="nowrap">
                <Grid item>
                    <Typography variant="subheading">
                        {this.facultyFullname}
                    </Typography>
                </Grid>
                <Grid item>
                    {pendingAvailability && (
                        <StatusChip
                            color="red"
                            label="Pending availability"
                        />
                    )}
                </Grid>
            </Grid>
        );
    };

    get facultyFullname() {
        return getFullName(this.props.faculty.user);
    }

    renderInfo = () => {
        const { faculty, facultyResponse, termSchedule } = this.props;
        const { INITIALIZING, FEEDBACK_GATHERING } = TERM_STATUSES;

        switch (termSchedule.status) {
            case INITIALIZING.identifier:
                return this.renderInitializingInfo(
                    faculty,
                    facultyResponse,
                    termSchedule
                );
            case FEEDBACK_GATHERING:
                return this.renderFeedbackGatheringInfo(
                    faculty,
                    facultyResponse,
                    termSchedule
                );
            default:
                return this.renderSchedulingInfo(
                    faculty,
                    facultyResponse,
                    termSchedule
                );
        }
    };

    render() {
        const { classes, faculty, connectDragSource, canDrag } = this.props;

        const rootClasses = [classes.facultyListItemContainer];
        if (canDrag) {
            rootClasses.push("canDrag");
        }

        return connectDragSource(
            <div className={rootClasses.join(" ")}>
                <Grid
                    container
                    spacing={8}
                    alignItems="center"
                    justify="space-between"
                    wrap="nowrap"
                >
                    <Grid item xs>
                        <Grid
                            container
                            spacing={16}
                            direction="row"
                            wrap="nowrap"
                            alignItems="center"
                        >
                            <Grid item>
                                <UserAvatar user={faculty.user} />
                            </Grid>
                            <Grid item xs>
                                {this.renderInfo()}
                            </Grid>
                        </Grid>
                    </Grid>
                    {canDrag && (
                        <Grid item>
                            <DragIndicator color="action" />
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export const FacultyListItem = wrap(BaseFacultyListItem);

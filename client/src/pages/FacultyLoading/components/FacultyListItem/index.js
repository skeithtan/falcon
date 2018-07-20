import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import { UserAvatar } from "../../../../components/UserAvatar";
import { getFullName } from "../../../../utils/user.util";
import { wrap } from "./wrapper";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { FacultyListItemMenu } from "../FacultyListItemMenu";
import { InitializingInfo } from "./info/InitializingInfo";
import { SchedulingInfo } from "./info/SchedulingInfo";
import { FeedbackGatheringInfo } from "./info/FeedbackGatheringInfo";
import { UserChip } from "../../../../components/UserChip";

class BaseFacultyListItem extends Component {
    state = {
        anchorEl: null,
    };

    get facultyFullname() {
        return getFullName(this.props.faculty.user);
    }

    handleMoreVertClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    renderSecondary = () => {
        const { faculty, facultyResponse, termSchedule } = this.props;
        const { INITIALIZING, FEEDBACK_GATHERING } = TERM_STATUSES;

        switch (termSchedule.status) {
            case INITIALIZING.identifier:
                return <InitializingInfo facultyResponse={facultyResponse} />;
            case FEEDBACK_GATHERING.identifier:
                return (
                    <FeedbackGatheringInfo
                        feedback={facultyResponse.feedback}
                    />
                );
            default:
                const assignedClasses = termSchedule.classes.filter(
                    classSchedule => classSchedule.faculty === faculty._id
                );

                return (
                    <SchedulingInfo
                        faculty={faculty}
                        assignedClasses={assignedClasses}
                    />
                );
        }
    };

    render() {
        const {
            classes,
            faculty,
            dragSource,
            dragPreview,
            canDrag,
            facultyResponse,
            termSchedule,
        } = this.props;

        const { anchorEl } = this.state;

        const rootClasses = [classes.facultyListItemContainer];
        if (canDrag) {
            rootClasses.push("canDrag");
        }

        return dragSource(
            <div>
                <ListItem className={rootClasses.join(" ")}>
                    <ListItemAvatar>
                        <UserAvatar user={faculty.user} />
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        primary={
                            <Typography
                                variant="body2"
                                color="inherit"
                                className={classes.facultyName}
                            >
                                {this.facultyFullname}
                            </Typography>
                        }
                        secondary={this.renderSecondary()}
                    />
                    {dragPreview(
                        <div className={classes.dragDivWrapper}>
                            <UserChip user={faculty.user} />
                        </div>
                    )}
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.handleMoreVertClick}>
                            <MoreVertIcon color="action" />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                <FacultyListItemMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleMenuClose}
                    faculty={faculty}
                    facultyResponse={facultyResponse}
                    termSchedule={termSchedule}
                />
            </div>
        );
    }
}

export const FacultyListItem = wrap(BaseFacultyListItem);

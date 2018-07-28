import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import AcceptedIcon from "@material-ui/icons/ThumbUp";
import RejectionIcon from "@material-ui/icons/ThumbDown";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";
import { FACULTY_FEEDBACK } from "../../../../enums/class.enums";

class BaseStatusChip extends PureComponent {
    renderAvatar() {
        const { classes, feedback, color } = this.props;

        if (!feedback) {
            return null;
        }

        const isAccepted =
            feedback.status === FACULTY_FEEDBACK.ACCEPTED.identifier;
        const icon = isAccepted ? <AcceptedIcon /> : <RejectionIcon />;
        
        return <Avatar className={classes[color]}>{icon}</Avatar>;
    }

    render() {
        const { label, color, classes } = this.props;
        return (
            <Chip
                avatar={this.renderAvatar()}
                label={label}
                className={classes[color]}
            />
        );
    }
}

export const StatusChip = wrap(BaseStatusChip);

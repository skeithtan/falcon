import React, { Component, Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { FeedbackDisplay } from "../FeedbackDisplay";
import { wrap } from "./wrapper";

class BaseFacultyListItemMenu extends Component {
    renderFeedback = () => {
        const {
            facultyResponse: { feedback },
            faculty,
        } = this.props;

        return (
            <Fragment>
                <FeedbackDisplay feedback={feedback} faculty={faculty} />
                <Divider />
            </Fragment>
        );
    };

    render() {
        const {
            classes,
            anchorEl,
            facultyResponse,
            termSchedule,
            onClose,
            open,
        } = this.props;
        
        const canViewTimeAvailability = facultyResponse.availability !== null;
        const canViewIndividualSchedule =
            termSchedule.status !== TERM_STATUSES.INITIALIZING.identifier;

        return (
            <Menu
                anchorEl={anchorEl}
                onClose={onClose}
                open={open}
                classes={{ paper: classes.menuContainer }}
            >
                {facultyResponse.feedback && this.renderFeedback()}

                <MenuItem
                    onClick={this.handleClose}
                    disabled={!canViewTimeAvailability}
                >
                    View time availability
                </MenuItem>
                <MenuItem
                    onClick={this.handleClose}
                    disabled={!canViewIndividualSchedule}
                >
                    View individual schedule
                </MenuItem>
                <Divider />
                <MenuItem onClick={this.handleClose}>
                    Remove this faculty from this term
                </MenuItem>
            </Menu>
        );
    }
}

export const FacultyListItemMenu = wrap(BaseFacultyListItemMenu);

import React, { Component, Fragment } from "react";

import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { wrap } from "./wrapper";

import { FeedbackDisplay } from "../FeedbackDisplay";

import { TERM_STATUSES } from "../../../../enums/class.enums";
import { makeURL } from "../../../../utils/url.util";

import { FacultyAvailabilityModal } from "../modals/FacultyAvailabilityModal";
import { RemoveFacultyModal } from "../modals/RemoveFacultyModal";
import { FacultyScheduleModal } from "../modals/FacultyScheduleModal";

class BaseFacultyListItemMenu extends Component {
    state = {
        facultyAvailabilityModalIsShowing: false,
        facultyScheduleModalIsShowing: false,
        removeFacultyModalIsShowing: false,
    };

    toggleFacultyAvailabilityModal = shouldShow =>
        this.setState({
            facultyAvailabilityModalIsShowing: shouldShow,
        });

    toggleFacultyScheduleModal = shouldShow =>
        this.setState({
            facultyScheduleModalIsShowing: shouldShow,
        });

    toggleRemoveFacultyModal = shouldShow =>
        this.setState({
            removeFacultyModalIsShowing: shouldShow,
        });

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

    renderRemoveFacultyModal = () => {
        const { faculty, termSchedule } = this.props;
        const { removeFacultyModalIsShowing } = this.state;
        return (
            <RemoveFacultyModal
                open={removeFacultyModalIsShowing}
                onClose={() => this.toggleRemoveFacultyModal(false)}
                faculty={faculty}
                termSchedule={termSchedule}
            />
        );
    };

    renderFacultyAvailabilityModal = () => {
        const {
            faculty,
            facultyResponse: { availability },
        } = this.props;
        const { facultyAvailabilityModalIsShowing } = this.state;
        return (
            <FacultyAvailabilityModal
                open={facultyAvailabilityModalIsShowing}
                onClose={() => this.toggleFacultyAvailabilityModal(false)}
                faculty={faculty}
                availability={availability}
            />
        );
    };

    renderFacultyScheduleModal = () => {
        const { faculty, termSchedule } = this.props;
        const { facultyScheduleModalIsShowing } = this.state;
        const assignedClasses = termSchedule.classes.filter(
            classSchedule => classSchedule.faculty === faculty._id
        );
        return (
            <FacultyScheduleModal
                open={facultyScheduleModalIsShowing}
                onClose={() => this.toggleFacultyScheduleModal(false)}
                faculty={faculty}
                assignedClasses={assignedClasses}
            />
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
            history,
            faculty,
            user,
        } = this.props;

        const canViewTimeAvailability = facultyResponse.availability !== null;
        const canViewIndividualSchedule =
            termSchedule.status !== TERM_STATUSES.INITIALIZING.identifier;

        const canRemoveFaculty =
            user.permissions.POPULATE_TERM_SCHEDULES &&
            termSchedule.status === TERM_STATUSES.INITIALIZING.identifier;

        return (
            <Menu
                disableAutoFocusItem
                anchorEl={anchorEl}
                onClose={onClose}
                open={open}
                classes={{ paper: classes.menuContainer }}
            >
                {facultyResponse.feedback && this.renderFeedback()}

                <MenuItem
                    onClick={() =>
                        history.push(
                            makeURL()
                                .facultyProfiles()
                                .selectFaculty(faculty._id)
                                .build()
                        )
                    }
                >
                    Visit profile
                </MenuItem>

                <MenuItem
                    onClick={() => this.toggleFacultyAvailabilityModal(true)}
                    disabled={!canViewTimeAvailability}
                    className={
                        canViewTimeAvailability ? null : classes.extraPadding
                    }
                >
                    <ListItemText
                        primary="View time availability"
                        secondary={
                            canViewTimeAvailability
                                ? null
                                : "Faculty has not submitted their time availability"
                        }
                    />
                </MenuItem>

                {canViewIndividualSchedule && (
                    <MenuItem
                        onClick={() => this.toggleFacultyScheduleModal(true)}
                        disabled={!canViewIndividualSchedule}
                    >
                        View individual schedule
                    </MenuItem>
                )}
                {canRemoveFaculty && (
                    <Fragment>
                        <Divider />
                        <MenuItem
                            onClick={() => this.toggleRemoveFacultyModal(true)}
                        >
                            Remove faculty from this term
                        </MenuItem>
                    </Fragment>
                )}

                {canRemoveFaculty && this.renderRemoveFacultyModal()}

                {facultyResponse.availability &&
                    this.renderFacultyAvailabilityModal()}

                {canViewIndividualSchedule && this.renderFacultyScheduleModal()}
            </Menu>
        );
    }
}

export const FacultyListItemMenu = wrap(BaseFacultyListItemMenu);

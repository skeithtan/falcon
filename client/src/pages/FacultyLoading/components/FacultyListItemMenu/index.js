import React, { Component, Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { FeedbackDisplay } from "../FeedbackDisplay";
import { RemoveFacultyModal } from "../modals/RemoveFacultyModal";
import { FacultyAvailabilityModal } from "../modals/FacultyAvailabilityModal";
import { makeURL } from "../../../../utils/url.util";
import { wrap } from "./wrapper";

class BaseFacultyListItemMenu extends Component {
    state = {
        facultyAvailabilityModalIsShowing: false,
        removeFacultyModalIsShowing: false,
    };

    toggleFacultyAvailabilityModal = shouldShow =>
        this.setState({
            facultyAvailabilityModalIsShowing: shouldShow,
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
                <MenuItem onClick={() => this.toggleRemoveFacultyModal(true)}>
                    Remove this faculty from this term
                </MenuItem>
                {this.renderRemoveFacultyModal()}
                {facultyResponse.availability &&
                    this.renderFacultyAvailabilityModal()}
            </Menu>
        );
    }
}

export const FacultyListItemMenu = wrap(BaseFacultyListItemMenu);

import Button from "@material-ui/core/Button";
import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { OverviewCard } from "../cards/OverviewCard";
import { ScheduleCard } from "../cards/ScheduleCard";
import { FacultiesCard } from "../cards/FacultiesCard";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { AddClassesModal } from "../modals/AddClassesModal";
import { ClassSchedulePopper } from "../ClassSchedulePopper";
import { RemoveClassScheduleModal } from "../modals/RemoveClassScheduleModal";
import { ClassScheduleModal } from "../modals/ClassScheduleModal";
import { wrap } from "./wrapper";

class BaseFacultyLoadingBody extends Component {
    state = {
        addClassScheduleModalIsShowing: false,
        activeClassSchedule: null,
        updateClassScheduleModalIsShowing: false,
        removeClassScheduleModalIsShowing: false,
        activeClassScheduleAnchorEl: null,
    };

    setActiveClassSchedule = (_id, anchorEl) =>
        this.setState({
            activeClassSchedule: _id,
            activeClassScheduleAnchorEl: anchorEl,
        });

    toggleUpdateClassScheduleModal = shouldShow =>
        this.setState({
            updateClassScheduleModalIsShowing: shouldShow,
        });

    toggleRemoveClassScheduleModal = shouldShow =>
        this.setState({
            removeClassScheduleModalIsShowing: shouldShow,
        });

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { classSchedule } = this.activeClassSchedule;
        const { activeClassSchedule } = this.state;

        if (activeClassSchedule && !classSchedule) {
            // If class schedule is invalid, remove it from the state as active
            this.setState({
                activeClassSchedule: null,
                updateClassScheduleModalIsShowing: false,
                removeClassScheduleModalIsShowing: false,
                activeClassScheduleAnchorEl: null,
            });
        }
    }

    get activeClassSchedule() {
        const { activeTermSchedule, faculties, subjects } = this.props;
        const { activeClassSchedule } = this.state;

        if (!activeClassSchedule) {
            return {
                classSchedule: null,
                faculty: null,
                subject: null,
            };
        }

        const classSchedule = activeTermSchedule.classes.find(
            ({ _id }) => _id === activeClassSchedule
        );

        if (!classSchedule) {
            return {
                classSchedule: null,
                faculty: null,
                subject: null,
            };
        }

        const faculty = faculties.find(
            ({ _id }) => _id === classSchedule.faculty
        );
        const subject = subjects.find(({ _id }) => _id === classSchedule.subject);

        return {
            classSchedule,
            faculty,
            subject,
        };
    }

    renderclassSchedulePopper = () => {
        const { activeClassScheduleAnchorEl, activeClassSchedule } = this.state;
        const { activeTermSchedule } = this.props;

        if (activeClassSchedule === null) {
            // No popper for no active class schedule
            return null;
        }

        const { classSchedule, faculty, subject } = this.activeClassSchedule;

        return (
            <ClassSchedulePopper
                open={Boolean(activeClassScheduleAnchorEl)}
                anchorEl={activeClassScheduleAnchorEl}
                onClose={this.handleClassSchedulePopperClose}
                classSchedule={classSchedule}
                faculty={faculty}
                subject={subject}
                termSchedule={activeTermSchedule}
                onRemoveClassScheduleClick={() =>
                    this.toggleRemoveClassScheduleModal(true)
                }
                onUpdateClassScheduleClick={() =>
                    this.toggleUpdateClassScheduleModal(true)
                }
            />
        );
    };

    handleClassSchedulePopperClose = () =>
        this.setState({
            activeClassScheduleAnchorEl: null,
        });

    toggleAddClassScheduleModal = shouldShow =>
        this.setState({
            addClassScheduleModalIsShowing: shouldShow,
        });

    renderScheduleFaculties = (activeTermSchedule, meetingDays) => (
        <div className={this.props.classes.scheduleFacultiesContainer}>
            <FacultiesCard
                termSchedule={activeTermSchedule}
                meetingDays={meetingDays}
            />
            <ScheduleCard
                activeTermSchedule={activeTermSchedule}
                meetingDays={meetingDays}
                setActiveClassSchedule={this.setActiveClassSchedule}
                toggleUpdateClassScheduleModal={
                    this.toggleUpdateClassScheduleModal
                }
                toggleRemoveClassScheduleModal={
                    this.toggleRemoveClassScheduleModal
                }
            />
        </div>
    );

    get shouldShowAddClassSchedule() {
        const { user, faculties, subjects, activeTermSchedule } = this.props;
        return (
            user.permissions.POPULATE_TERM_SCHEDULES &&
            activeTermSchedule.status ===
                TERM_STATUSES.INITIALIZING.identifier &&
            faculties !== null &&
            subjects !== null &&
            activeTermSchedule !== null &&
            this.activeClassSchedule.classSchedule !== null
        );
    }

    get shouldShowRemoveTermSchedule() {
        const { activeTermSchedule } = this.props;
        return (
            activeTermSchedule.status ===
                TERM_STATUSES.INITIALIZING.identifier &&
            this.activeClassSchedule.classSchedule !== null
        );
    }

    get shouldShowUpdateTermSchedule() {
        const { user, activeTermSchedule } = this.props;
        return (
            this.activeClassSchedule.classSchedule !== null &&
            user.permissions.POPULATE_TERM_SCHEDULES &&
            [
                TERM_STATUSES.INITIALIZING.identifier,
                TERM_STATUSES.SCHEDULING.identifier,
            ].includes(activeTermSchedule.status)
        );
    }

    renderModals = () => {
        const {
            addClassScheduleModalIsShowing,
            updateClassScheduleModalIsShowing,
            removeClassScheduleModalIsShowing,
        } = this.state;

        const { classSchedule, subject } = this.activeClassSchedule;
        const { activeTermSchedule } = this.props;

        return (
            <Fragment>
                {this.shouldShowAddClassSchedule && (
                    <AddClassesModal
                        action="add"
                        open={addClassScheduleModalIsShowing}
                        termSchedule={activeTermSchedule}
                        onClose={() => this.toggleAddClassScheduleModal(false)}
                    />
                )}

                {this.shouldShowRemoveTermSchedule && (
                    <RemoveClassScheduleModal
                        open={removeClassScheduleModalIsShowing}
                        onClose={() =>
                            this.toggleRemoveClassScheduleModal(false)
                        }
                        classSchedule={classSchedule}
                        termSchedule={activeTermSchedule}
                        subject={subject}
                    />
                )}

                {this.shouldShowUpdateTermSchedule && (
                    <ClassScheduleModal
                        action="update"
                        open={updateClassScheduleModalIsShowing}
                        onClose={() =>
                            this.toggleUpdateClassScheduleModal(false)
                        }
                        classSchedule={classSchedule}
                        termSchedule={activeTermSchedule}
                    />
                )}
            </Fragment>
        );
    };

    render() {
        const { classes, activeTermSchedule, meetingDays } = this.props;

        return (
            <div className={classes.facultyLoadingBody}>
                <div className={classes.cardsContainer}>
                    <Grid
                        className={classes.height100}
                        container
                        spacing={16}
                        alignItems="stretch"
                        direction="column"
                        wrap="nowrap"
                    >
                        <Grid item>
                            <OverviewCard
                                activeTermSchedule={activeTermSchedule}
                                meetingDays={meetingDays}
                            />
                        </Grid>
                        <Grid item xs>
                            {this.renderScheduleFaculties(
                                activeTermSchedule,
                                meetingDays
                            )}
                        </Grid>
                    </Grid>
                </div>

                {this.shouldShowAddClassSchedule && (
                    <Button
                        variant="extendedFab"
                        color="primary"
                        className={classes.floatingActionButton}
                        onClick={() => this.toggleAddClassScheduleModal(true)}
                    >
                        <AddIcon />
                        Add Class
                    </Button>
                )}

                {this.renderModals()}
                {this.renderclassSchedulePopper()}
            </div>
        );
    }
}

export const FacultyLoadingBody = wrap(BaseFacultyLoadingBody);

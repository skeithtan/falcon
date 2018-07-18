import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { OverviewCard } from "../cards/OverviewCard";
import { wrap } from "./wrapper";
import { ScheduleCard } from "../cards/ScheduleCard";
import { FacultiesCard } from "../cards/FacultiesCard";
import { ClassScheduleModal } from "../modals/ClassScheduleModal";
import { TERM_STATUSES } from "../../../../enums/class.enums";

class BaseFacultyLoadingBody extends Component {
    state = {
        addClassScheduleModalIsShowing: false,
    };

    toggleAddClassScheduleModal = shouldShow =>
        this.setState({
            addClassScheduleModalIsShowing: shouldShow,
        });

    renderScheduleFaculties = (activeTermSchedule, meetingDays) => (
        <Grid
            container
            className={this.props.classes.scheduleFacultiesContainer}
            spacing={16}
            direction="row"
            alignItems="stretch"
            wrap="nowrap"
        >
            <Grid item xs={3} >
                <FacultiesCard
                    termSchedule={activeTermSchedule}
                    meetingDays={meetingDays}
                />
            </Grid>
            <Grid item xs={9} lg={11} xl={12}>
                <ScheduleCard
                    activeTermSchedule={activeTermSchedule}
                    meetingDays={meetingDays}
                />
            </Grid>
        </Grid>
    );

    render() {
        const {
            classes,
            activeTermSchedule,
            meetingDays,
            user,
            faculties,
            subjects,
        } = this.props;

        const { addClassScheduleModalIsShowing } = this.state;

        const shouldShowAddClassSchedule =
            user.permissions.POPULATE_TERM_SCHEDULES &&
            activeTermSchedule.status === TERM_STATUSES.INITIALIZING.identifier &&
            faculties !== null &&
            subjects !== null &&
            activeTermSchedule !== null;

        return (
            <div className={classes.facultyLoadingBody}>
                <div className={classes.cardsContainer}>
                    <Grid
                        container
                        className={
                            this.props.classes.scheduleFacultiesContainer
                        }
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

                {shouldShowAddClassSchedule && (
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

                {shouldShowAddClassSchedule && (
                    <ClassScheduleModal
                        action="add"
                        open={addClassScheduleModalIsShowing}
                        termSchedule={activeTermSchedule}
                        onClose={() => this.toggleAddClassScheduleModal(false)}
                    />
                )}
            </div>
        );
    }
}

export const FacultyLoadingBody = wrap(BaseFacultyLoadingBody);

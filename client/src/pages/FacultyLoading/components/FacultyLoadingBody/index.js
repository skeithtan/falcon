import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { OverviewCard } from "../cards/OverviewCard";
import { wrap } from "./wrapper";
import { ScheduleCard } from "../cards/ScheduleCard";
import { FacultiesCard } from "../cards/FacultiesCard";
import { ClassScheduleModal } from "../modals/ClassScheduleModal";

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
        >
            <Grid item xs={3}>
                <FacultiesCard
                    facultyResponses={activeTermSchedule.facultyPool}
                    meetingDays={meetingDays}
                />
            </Grid>
            <Grid item xs={9}>
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
            user.permissions.MUTATE_TERM_SCHEDULES &&
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
                        subjects={subjects}
                        faculties={faculties}
                        termSchedule={activeTermSchedule}
                        onClose={() => this.toggleAddClassScheduleModal(false)}
                    />
                )}
            </div>
        );
    }
}

export const FacultyLoadingBody = wrap(BaseFacultyLoadingBody);

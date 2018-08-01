import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { Component } from "react";
import { ScheduleCalendar } from "../../ScheduleCalendar";
import Divider from "@material-ui/core/Divider";
import { makeURL } from "../../../../../utils/url.util";
import { wrap } from "./wrapper";
import { FACULTY_LOADING_PAGE } from "../../../..";
import { MEETING_DAYS } from "../../../../../enums/class.enums";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../../components/states/ErrorState";

class BaseScheduleCard extends Component {
    state = {
        showOnlyUnassigned: false,
    };

    handleSetOnlyUnassignedCheckbox = ({ target: { checked } }) =>
        this.setState({
            showOnlyUnassigned: checked,
        });

    componentDidMount() {
        this.handlePath();
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handlePath();
        this.fetchData();
    }

    meetingDaysPathIsValid = meetingDays =>
        Object.values(MEETING_DAYS)
            .map(({ path }) => path)
            .includes(meetingDays);

    fetchData = () => {
        const {
            faculties,
            subjects,
            fetchAllFaculties,
            fetchAllSubjects,
        } = this.props;

        if (!faculties.faculties && !faculties.isLoading && !faculties.errors) {
            fetchAllFaculties();
        }

        if (!subjects.subjects && !subjects.isLoading && !subjects.errors) {
            fetchAllSubjects();
        }
    };

    handlePath = () => {
        const { meetingDays, activeTermSchedule, history } = this.props;
        if (!meetingDays) {
            history.replace(
                makeURL()
                    .facultyLoading()
                    .selectTermSchedule(activeTermSchedule._id)
                    .mondayThursday()
                    .build()
            );
        }

        if (!this.meetingDaysPathIsValid(meetingDays)) {
            history.replace(
                makeURL()
                    .facultyLoading()
                    .selectTermSchedule(activeTermSchedule._id)
                    .mondayThursday()
                    .build()
            );
        }
    };

    onTabClick = path => {
        const { meetingDays, history, activeTermSchedule } = this.props;

        if (path === meetingDays) {
            return;
        }

        history.push(
            `/${FACULTY_LOADING_PAGE.path}/${activeTermSchedule._id}/${path}`
        );
    };

    renderToolbar = () => {
        const { classes, meetingDays } = this.props;
        return (
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs>
                    <Tabs
                        value={meetingDays}
                        indicatorColor="primary"
                        textColor="primary"
                        classes={{ flexContainer: classes.tabsFlexContainer }}
                    >
                        {Object.values(MEETING_DAYS).map(({ name, path }) => (
                            <Tab
                                key={path}
                                label={name}
                                value={path}
                                onClick={() => this.onTabClick(path)}
                            />
                        ))}
                    </Tabs>
                </Grid>
                <Grid item>
                    <FormControlLabel
                        label="Show only unassigned classes"
                        control={
                            <Checkbox
                                checked={this.state.showOnlyUnassigned}
                                onChange={this.handleSetOnlyUnassignedCheckbox}
                            />
                        }
                    />
                </Grid>
            </Grid>
        );
    };

    getClassSchedules = () => {
        const { meetingDays: meetingDaysPath, activeTermSchedule } = this.props;
        const { showOnlyUnassigned } = this.state;
        let meetingDayKey = MEETING_DAYS.M_TH.identifier;

        if (this.meetingDaysPathIsValid(meetingDaysPath)) {
            const meetingDay = Object.values(MEETING_DAYS).find(
                ({ path }) => path === meetingDaysPath
            );

            meetingDayKey = meetingDay.identifier;
        }

        let classSchedules = activeTermSchedule.classes.filter(
            classSchedule => classSchedule.meetingDays === meetingDayKey
        );

        if (showOnlyUnassigned) {
            classSchedules = classSchedules.filter(
                classSchedule => classSchedule.faculty === null
            );
        }

        return classSchedules;
    };

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = (errors, onErrorRetryButtonClick) => (
        <ErrorState
            onRetryButtonClick={onErrorRetryButtonClick}
            message="An error occurred while trying to fetch data."
            debug={errors[0]}
        />
    );

    renderCardContent = () => {
        const {
            classes,
            faculties,
            subjects,
            fetchAllFaculties,
            fetchAllSubjects,
            activeTermSchedule,
            activeClassSchedule,
            setActiveClassSchedule,
            toggleUpdateClassScheduleModal,
            toggleRemoveClassScheduleModal,
        } = this.props;

        const isLoading = faculties.isLoading || subjects.isLoading;
        const errors = faculties.errors || subjects.errors;
        const onErrorRetryButtonClick = faculties.errors
            ? fetchAllFaculties
            : fetchAllSubjects;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors, onErrorRetryButtonClick);
        }

        const classSchedules = this.getClassSchedules();

        if (subjects.subjects === null || faculties.faculties === null) {
            return null;
        }

        return (
            <Grid
                className={classes.scheduleCardContainer}
                container
                direction="column"
                wrap="nowrap"
            >
                <Grid item>{this.renderToolbar()}</Grid>
                <Grid item>
                    <Divider light />
                </Grid>
                <Grid item xs>
                    <ScheduleCalendar
                        classSchedules={classSchedules}
                        faculties={faculties.faculties}
                        subjects={subjects.subjects}
                        termSchedule={activeTermSchedule}
                        activeClassSchedule={activeClassSchedule}
                        setActiveClassSchedule={setActiveClassSchedule}
                        toggleUpdateClassScheduleModal={
                            toggleUpdateClassScheduleModal
                        }
                        toggleRemoveClassScheduleModal={
                            toggleRemoveClassScheduleModal
                        }
                    />
                </Grid>
            </Grid>
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.scheduleCardContainer}>
                {this.renderCardContent()}
            </Card>
        );
    }
}

export const ScheduleCard = wrap(BaseScheduleCard);

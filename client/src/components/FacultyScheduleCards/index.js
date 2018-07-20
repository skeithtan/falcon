import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MEETING_HOURS, MEETING_DAYS } from "../../enums/class.enums";
import { ClassScheduleSquare } from "../ClassScheduleSquare";
import { wrap } from "./wrapper";
import { FullPageLoadingIndicator } from "../FullPageLoadingIndicator";
import { ErrorState } from "../states/ErrorState";

class BaseFacultyScheduleCards extends PureComponent {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchData();
    }

    fetchData = () => {
        const { subjects, fetchAllSubjects } = this.props;
        if (!subjects.subjects && !subjects.isLoading && !subjects.errors) {
            fetchAllSubjects();
        }
    };

    renderCardHeader = () => (
        <Grid
            className={this.props.classes.cardColumnHead}
            container
            direction="row"
            wrap="nowrap"
        >
            {Object.values(MEETING_HOURS).map(({ name, identifier }) => (
                <Grid item xs={2} key={identifier}>
                    <Typography color="textSecondary" align="center">
                        {name}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );

    renderCardBody = meetingDayIdentifier => (
        <Grid
            container
            className={this.props.classes.classScheduleSquresContainer}
            direction="row"
            wrap="nowrap"
        >
            {Object.values(MEETING_HOURS).map(({ identifier }) => {
                const {
                    assignedClasses,
                    subjects: { subjects },
                } = this.props;

                const classSchedule = assignedClasses.find(
                    ({ meetingDays, meetingHours }) =>
                        meetingDays === meetingDayIdentifier &&
                        meetingHours === identifier
                );

                const subject =
                    classSchedule &&
                    subjects.find(
                        subject => subject._id === classSchedule.subject
                    );

                return (
                    <Grid item xs={2} key={identifier}>
                        <ClassScheduleSquare
                            classSchedule={classSchedule}
                            subject={subject}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.fetchData}
            message="An error occurred while trying to fetch list of subjects."
            debug={errors[0]}
        />
    );

    render() {
        const {
            subjects: { isLoading, errors, subjects },
        } = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        if (!subjects) {
            return null;
        }

        return (
            <Grid
                container
                direction="column"
                spacing={16}
                wrap="nowrap"
                alignItems="stretch"
            >
                {Object.values(MEETING_DAYS).map(({ identifier, name }) => (
                    <Grid item key={identifier}>
                        <Card>
                            <Toolbar>
                                <Typography variant="title">{name}</Typography>
                            </Toolbar>
                            {this.renderCardHeader()}
                            <Divider />
                            {this.renderCardBody(identifier)}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export const FacultyScheduleCards = wrap(BaseFacultyScheduleCards);

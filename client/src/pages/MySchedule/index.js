import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { wrap } from "./wrapper";
import { ErrorState } from "../../components/states/ErrorState";
import { makeURL } from "../../utils/url.util";
import { MyScheduleBody } from "./components/MyScheduleBody";

class BaseMySchedulePage extends PureComponent {
    componentDidMount() {
        document.title = "My Schedule - Falcon";
        this.fetchData();
        this.handlePath();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handlePath();
    }

    fetchData = () => {
        const {
            termSchedules,
            subjects,
            fetchMySchedules,
            fetchSubjects,
        } = this.props;

        if (
            !subjects.isLoading &&
            subjects.subjects === null &&
            !subjects.errors
        ) {
            fetchSubjects();
        }

        if (
            !termSchedules.isLoading &&
            termSchedules.termSchedules === null &&
            !termSchedules.errors
        ) {
            fetchMySchedules();
        }
    };

    handlePath = () => {
        const {
            match: {
                params: { termScheduleId },
            },
            termSchedules: { termSchedules },
        } = this.props;

        // We need termSchedules to determine how to deal with URL
        // If there are is no defaultTermSchedule, that means there are no term schedules at all
        if (termSchedules === null || !this.getDefaultTermSchedule()) {
            return;
        }

        // If we don't have a selected term schedule
        if (!termScheduleId) {
            // Pick one for the user
            this.redirectToDefaultTermSchedule(termSchedules);
            return;
        }

        const termSchedule = this.getTermScheduleFromId(termScheduleId);

        // If we do have a termScheduleId but it's invalid
        if (!termSchedule) {
            this.redirectToDefaultTermSchedule(termSchedules);
            return;
        }
    };

    getDefaultTermSchedule = () => {
        const { current, archived } = this.props.termSchedules.termSchedules;
        return current ? current : archived[0];
    };

    getTermScheduleFromId = termScheduleId => {
        const { current, archived } = this.props.termSchedules.termSchedules;
        const termSchedules = [...archived];
        if (current) {
            termSchedules.push(current);
        }

        return termSchedules.find(
            termSchedule => termSchedule._id === termScheduleId
        );
    };

    redirectToDefaultTermSchedule = () => {
        const termScheduleToShow = this.getDefaultTermSchedule();
        this.props.history.replace(
            makeURL()
                .mySchedule()
                .selectTermSchedule(termScheduleToShow._id)
                .build()
        );
    };

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.fetchData}
            message="An error occurred while trying to fetch faculty details."
            debug={errors[0]}
        />
    );

    renderNoTermSchedules = () => {
        return (
            <Grid
                container
                style={{ height: "100%" }}
                alignItems="center"
                justify="center"
            >
                <Grid item container direction="column" spacing={8}>
                    <Grid item>
                        <Typography
                            variant="display1"
                            color="textSecondary"
                            align="center"
                        >
                            There are no schedules yet.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="subheading"
                            color="textSecondary"
                            align="center"
                        >
                            You can see your schedule here when they have been
                            assigned.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    render() {
        const {
            classes,
            termSchedules,
            subjects,
            match: {
                params: { termScheduleId },
            },
        } = this.props;

        const isLoading = termSchedules.isLoading || subjects.isLoading;
        const errors = termSchedules.errors || subjects.errors;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        const activeTermSchedule =
            termSchedules.termSchedules !== null &&
            this.getTermScheduleFromId(termScheduleId);

        const noTermSchedules =
            termSchedules.termSchedules !== null &&
            termSchedules.termSchedules.current === null &&
            termSchedules.termSchedules.archived.length === 0;

        return (
            <div className={classes.myScheduleContainer}>
                {activeTermSchedule && (
                    <MyScheduleBody termSchedule={activeTermSchedule} />
                )}

                {noTermSchedules && this.renderNoTermSchedules()}
            </div>
        );
    }
}

export const MySchedulePage = wrap(BaseMySchedulePage);

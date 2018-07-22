import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import React, { Component } from "react";
import { FacultyListItem } from "../../FacultyListItem";
import { wrap } from "./wrapper";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { AddFacultyModal } from "../../modals/AddFacultyModal";
import { TERM_STATUSES } from "../../../../../enums/class.enums";

class BaseFacultiesCard extends Component {
    state = {
        addFacultyModalIsShowing: false,
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const facultiesDidChange = this.props.faculties !== nextProps.faculties;
        const termScheduleDidChange =
            this.props.termSchedule !== nextProps.termSchedule;
        const stateDidChange = this.state !== nextState;

        return facultiesDidChange || termScheduleDidChange || stateDidChange;
    }

    fetchData = () => {
        const {
            faculties: { isLoading, errors, faculties },
            fetchAllFaculties,
        } = this.props;

        if (!isLoading && !faculties && !errors) {
            fetchAllFaculties();
        }
    };

    toggleAddFacultyModal = shouldShow =>
        this.setState({
            addFacultyModalIsShowing: shouldShow,
        });

    renderEmptyState = () => (
        <EmptyState
            bigMessage="No faculties found"
            smallMessage="When faculties are added, you can see them here"
            onAddButtonClick={() => this.toggleAddFacultyModal(true)}
            addButtonText="Add a faculty"
            showAddButton={this.canSchedule}
        />
    );

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchAllFaculties}
            message="An error occurred while trying to fetch faculties."
            debug={errors[0]}
        />
    );

    get canSchedule() {
        const { termSchedule, user } = this.props;
        return (
            termSchedule.status === TERM_STATUSES.SCHEDULING.identifier &&
            user.permissions.MUTATE_TERM_SCHEDULES
        );
    }

    renderList = facultyResponses => (
        <List dense>
            {facultyResponses.map(facultyResponse => (
                <FacultyListItem
                    key={facultyResponse.faculty}
                    facultyResponse={facultyResponse}
                    faculty={this.getFacultyFromId(facultyResponse.faculty)}
                    termSchedule={this.props.termSchedule}
                    canSchedule={this.canSchedule}
                />
            ))}
        </List>
    );

    getFacultyFromId = _id => {
        const {
            faculties: { faculties },
        } = this.props;
        return faculties.find(faculty => faculty._id === _id);
    };

    renderCardContent = () => {
        const {
            faculties: { faculties, isLoading, errors },
            termSchedule: { facultyPool },
        } = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        if (facultyPool.length === 0) {
            return this.renderEmptyState();
        }

        if (!faculties) {
            return null;
        }

        return this.renderList(facultyPool);
    };

    renderToolbar = () => {
        const {
            faculties: { faculties },
            termSchedule,
        } = this.props;
        const { addFacultyModalIsShowing } = this.state;

        const shouldShowAddFacultiesButton =
            faculties !== null &&
            termSchedule.status === TERM_STATUSES.INITIALIZING.identifier;

        return (
            <Toolbar>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography variant="title">Faculties</Typography>
                    </Grid>
                    <Grid item>
                        {shouldShowAddFacultiesButton && (
                            <Tooltip
                                disableFocusListener
                                title="Add faculty to term schedule"
                            >
                                <IconButton
                                    color="primary"
                                    onClick={() =>
                                        this.toggleAddFacultyModal(true)
                                    }
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Grid>
                </Grid>
                {faculties !== null && (
                    <AddFacultyModal
                        action="update"
                        open={addFacultyModalIsShowing}
                        onClose={() => this.toggleAddFacultyModal(false)}
                        allFaculties={faculties}
                        termSchedule={termSchedule}
                    />
                )}
            </Toolbar>
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.facultiesCardContainer}>
                <Grid
                    className={classes.facultiesCardContainer}
                    container
                    direction="column"
                    wrap="nowrap"
                >
                    <Grid item>{this.renderToolbar()}</Grid>
                    <Grid item xs className={classes.facultiesListContainer}>
                        {this.renderCardContent()}
                    </Grid>
                </Grid>
            </Card>
        );
    }
}
export const FacultiesCard = wrap(BaseFacultiesCard);

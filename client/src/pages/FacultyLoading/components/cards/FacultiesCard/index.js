import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import React, { Component } from "react";
import { FacultyListItem } from "../../FacultyListItem";
import { wrap } from "./wrapper";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../../components/states/ErrorState";

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
        <Card>
            <EmptyState
                bigMessage="No faculties found"
                smallMessage="When faculties are added, you can see them here"
                onAddButtonClick={() => this.toggleAddFacultyModal(true)}
                addButtonText="Add a faculty"
                showAddButton={
                    this.props.user.permissions.MUTATE_TERM_SCHEDULES
                }
            />
        </Card>
    );

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <Card>
            <ErrorState
                onRetryButtonClick={this.props.fetchAllFaculties}
                message="An error occurred while trying to fetch faculties."
                debug={errors[0]}
            />
        </Card>
    );

    renderList = facultyResponses => (
        <Grid
            container
            direction="column"
            spacing={8}
            alignItems="stretch"
            wrap="nowrap"
        >
            {facultyResponses.map(facultyResponse => (
                <Grid item key={facultyResponse.faculty}>
                    <FacultyListItem
                        facultyResponse={facultyResponse}
                        faculty={this.getFacultyFromId(facultyResponse.faculty)}
                    />
                </Grid>
            ))}
        </Grid>
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
            facultyResponses,
        } = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        if (facultyResponses.length === 0) {
            return this.renderEmptyState();
        }

        if (!faculties) {
            return null;
        }

        return this.renderList(facultyResponses);
    };

    render() {
        return (
            <Grid container spacing={16} direction="column" wrap="nowrap">
                <Grid item>
                    <Card>
                        <Toolbar>
                            <Grid
                                container
                                alignItems="center"
                                justify="space-between"
                            >
                                <Grid item>
                                    <Typography variant="title">
                                        Faculties
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Add faculty to term schedule">
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                this.toggleAddFacultyModal(true)
                                            }
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Card>
                </Grid>
                <Grid item>{this.renderCardContent()}</Grid>
            </Grid>
        );
    }
}
export const FacultiesCard = wrap(BaseFacultiesCard);

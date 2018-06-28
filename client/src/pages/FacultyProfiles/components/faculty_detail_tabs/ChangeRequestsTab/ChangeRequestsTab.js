import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { getFullName, getObjectForUserType } from "../../../../../utils/user.util";
import { ChangeRequestCard } from "../../cards/ChangeRequestCard";


export class ChangeRequestsTab extends Component {
    componentDidMount() {
        this.fetchChangeRequests();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchChangeRequests();
    }

    approveChangeRequest = changeRequest => {
        const {onApproveChangeRequest, faculty} = this.props;
        return onApproveChangeRequest(changeRequest, faculty);
    };

    rejectChangeRequest = changeRequest => {
        const {onRejectChangeRequest} = this.props;
        return onRejectChangeRequest(changeRequest);
    };

    fetchChangeRequests = () => {
        const {
            user,
            getChangeRequests,
            getMyChangeRequests,
            isLoading,
            errors,
            changeRequests,
        } = this.props;

        const fetch = getObjectForUserType(user, {
            CLERK: getChangeRequests,
            DEAN: getChangeRequests,
            ASSOCIATE_DEAN: getChangeRequests,
            FACULTY: getMyChangeRequests,
        });

        if (!isLoading && !changeRequests && !errors) {
            fetch();
        }
    };

    renderEmptyState = () => (
        <Card>
            <TableToolbar
                tableTitle="Change Requests"
                showAddButton={false}
            />
            <EmptyState
                bigMessage={`${getFullName(this.props.faculty.user)} has not submitted a change request`}
                smallMessage={`When ${getFullName(this.props.faculty.user)} submits a change request, it will be shown here.`}
                showAddButton={false}
            />
        </Card>
    );

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <div className={this.props.classes.cardsContainer}>
            <Card>
                <ErrorState
                    onRetryButtonClick={() => this.props.getFacultyDetails(this.props.activeFaculty)}
                    message="An error occurred while trying to fetch faculty details."
                    debug={errors[0]}
                />
            </Card>
        </div>
    );

    renderChangeRequests = changeRequests => changeRequests.map(changeRequest => (
        <Grid item key={changeRequest._id}>
            <ChangeRequestCard
                user={this.props.user}
                faculty={this.props.faculty}
                changeRequest={changeRequest}
                approveChangeRequest={() => this.approveChangeRequest(changeRequest)}
                rejectChangeRequest={() => this.rejectChangeRequest(changeRequest)}
            />
        </Grid>
    ));

    get changeRequestsForCurrentFaculty() {
        const {faculty, changeRequests} = this.props;
        return changeRequests ?
            changeRequests.filter(changeRequest => changeRequest.faculty === faculty._id) :
            null;
    }

    render() {
        const {classes, isLoading, errors} = this.props;
        const changeRequests = this.changeRequestsForCurrentFaculty;

        if (isLoading) {
            return this.renderLoading();
        }

        return (
            <div className={classes.cardsContainer}>
                {changeRequests && changeRequests.length > 1 &&
                <Grid
                    container
                    spacing={16}
                    alignItems="stretch"
                    direction="column"
                    wrap="nowrap"
                >
                    <Grid item>
                        <Card>
                            <Typography variant="title">Change Requests</Typography>
                        </Card>
                    </Grid>
                    {this.renderChangeRequests(changeRequests)}
                </Grid>
                }

                {changeRequests && changeRequests.length === 0 && this.renderEmptyState()}
                {errors && this.renderErrors(errors)}
            </div>
        );
    }
}
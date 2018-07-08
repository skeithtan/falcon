import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React, { PureComponent } from "react";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { getFullName, getObjectForUserType } from "../../../../../utils/user.util";
import { ChangeRequestCard } from "../../cards/ChangeRequestCard";
import { wrap } from "./wrapper";


class BaseChangeRequestsTab extends PureComponent {
    componentDidMount() {
        this.fetchChangeRequests();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.faculty._id !== this.props.faculty._id) {
            this.fetchChangeRequests();
        }
    }

    approveChangeRequest = changeRequest => {
        const {onApproveChangeRequest, faculty} = this.props;
        return onApproveChangeRequest(changeRequest, faculty);
    };

    rejectChangeRequest = (changeRequest, rejectionReason) => {
        const {onRejectChangeRequest, faculty} = this.props;
        return onRejectChangeRequest(changeRequest, rejectionReason, faculty);
    };

    fetchChangeRequests = () => {
        const {
            user,
            fetchChangeRequests,
            fetchMyChangeRequests,
            changeRequests: {
                changeRequests: allChangeRequests,
                isLoading,
            },
        } = this.props;

        const fetch = getObjectForUserType(user, {
            CLERK: fetchChangeRequests,
            DEAN: fetchChangeRequests,
            ASSOCIATE_DEAN: fetchChangeRequests,
            FACULTY: fetchMyChangeRequests,
        });

        if (!isLoading && !allChangeRequests) {
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
                    onRetryButtonClick={this.fetchChangeRequests}
                    message="An error occurred while trying to fetch change requests."
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
                rejectChangeRequest={rejectionReason => this.rejectChangeRequest(changeRequest, rejectionReason)}
            />
        </Grid>
    ));

    render() {
        const {
            classes,
            faculty,
            changeRequests: {
                changeRequests: allChangeRequests,
                isLoading,
                errors,
            },
        } = this.props;

        const changeRequests = allChangeRequests && allChangeRequests[faculty._id];

        if (isLoading) {
            return this.renderLoading();
        }

        return (
            <div className={classes.cardsContainer}>
                {changeRequests && changeRequests.length > 0 &&
                <Grid
                    container
                    spacing={16}
                    alignItems="stretch"
                    direction="column"
                    wrap="nowrap"
                    className={classes.changeRequestsContainer}
                >
                    <Grid item>
                        <Card>
                            <TableToolbar
                                tableTitle="Change Requests"
                                showAddButton={false}
                            />
                        </Card>
                    </Grid>
                    {this.renderChangeRequests(changeRequests)}
                </Grid>
                }

                {allChangeRequests && !changeRequests && this.renderEmptyState()}
                {errors && this.renderErrors(errors)}
            </div>
        );
    }
}

export const ChangeRequestsTab = wrap(BaseChangeRequestsTab);
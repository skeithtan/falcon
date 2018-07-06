import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AcceptIcon from "@material-ui/icons/Check";
import RejectIcon from "@material-ui/icons/Close";
import React, { Component } from "react";
import { CHANGE_REQUEST_STATUSES } from "../../../../../../../enums/review_profile_change.enums";
import { RejectChangeRequestModal } from "../RejectChangeRequestModal";


export class ChangeRequestAdministrativeFooter extends Component {
    state = {
        isSubmitting: false,
        error: null,
        rejectChangeRequestModalIsShowing: false,
    };

    toggleRejectChangeRequestModal = shouldShow => this.setState({
        rejectChangeRequestModalIsShowing: shouldShow,
    });

    approveChangeRequest = () => {
        const {approveChangeRequest} = this.props;
        this.setState({
            isSubmitting: true,
        });

        approveChangeRequest()
            .catch(error => {
                this.setState({
                    isSubmitting: false,
                    error: error.message,
                });
                console.log("An error occurred while reviewing change request", error);
            });
    };

    renderButtons = () => (
        <Grid container spacing={32} justify="flex-end" wrap="nowrap">
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={() => this.toggleRejectChangeRequestModal(true)}
                >
                    <Grid container spacing={8} alignItems="center" wrap="nowrap">
                        <Grid item>
                            Reject
                        </Grid>
                        <Grid item>
                            <RejectIcon />
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={this.approveChangeRequest}
                >
                    <Grid container spacing={8} alignItems="center" wrap="nowrap">
                        <Grid item>
                            Accept
                        </Grid>
                        <Grid item>
                            <AcceptIcon />
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        </Grid>
    );

    renderReviewed = () => (
        <Typography variant="body1">
            You have <strong>{CHANGE_REQUEST_STATUSES[this.props.changeRequestStatus].name}</strong> this change request.
        </Typography>
    );

    renderActions = () => {
        const {isSubmitting, error} = this.state;
        return (
            <Grid container alignItems="center" justify="space-between">
                <Grid item>
                    <Grid container spacing={8} alignItems="center" wrap="nowrap">
                        {isSubmitting &&
                        <Grid item>
                            <CircularProgress size={24} />
                        </Grid>
                        }

                        {isSubmitting &&
                        <Grid item>
                            <Typography color="primary">
                                Submitting...
                            </Typography>
                        </Grid>
                        }

                        {error &&
                        <Grid item>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                        }
                    </Grid>
                </Grid>

                <Grid item>
                    {this.renderButtons()}
                </Grid>
            </Grid>
        );
    };

    render() {
        const {rejectChangeRequestModalIsShowing} = this.state;
        const {rejectChangeRequest, changeRequestStatus} = this.props;

        return (
            <Toolbar>

                {
                    changeRequestStatus === CHANGE_REQUEST_STATUSES.PENDING.identifier ?
                        this.renderActions() : this.renderReviewed()
                }

                <RejectChangeRequestModal
                    open={rejectChangeRequestModalIsShowing}
                    onClose={() => this.toggleRejectChangeRequestModal(false)}
                    rejectChangeRequest={rejectChangeRequest}
                />
            </Toolbar>
        );
    }
}